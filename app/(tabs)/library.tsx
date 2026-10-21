import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Dumbbell, Search, Sparkles, Camera, MessageCircle, ChevronRight, Clock } from 'lucide-react-native';
import { EQUIPMENT } from '../../data/equipment';
import type { Category } from '../../data/equipment';
import { ROUTINES } from '../../data/routines';

type Filter = 'All' | Category;
const FILTERS: Filter[] = ['All', 'Free Weights', 'Machines', 'Cables', 'Bodyweight'];

export default function LibraryScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<'Equipment' | 'Routines'>('Equipment');
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');
  const [sheet, setSheet] = useState(false);

  const q = query.trim().toLowerCase();
  const items = EQUIPMENT.filter(
    (e) => (filter === 'All' || e.type === filter) && (q === '' || (e.name + ' ' + e.tag).toLowerCase().includes(q))
  );
  const routines = ROUTINES.filter((r) => q === '' || (r.name + ' ' + r.tags.join(' ')).toLowerCase().includes(q));

  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.brandRow}>
            <View style={styles.logo}><Dumbbell size={18} color="#FFFFFF" /></View>
            <Text style={styles.brand}>FlowRep</Text>
          </View>

          <View style={styles.search}>
            <Search size={18} color="#8A9694" />
            <TextInput
              style={styles.input}
              placeholder="Search equipment, machines..."
              placeholderTextColor="#8A9694"
              value={query}
              onChangeText={setQuery}
            />
          </View>

          <View style={styles.segment}>
            {(['Equipment', 'Routines'] as const).map((m) => (
              <TouchableOpacity key={m} style={[styles.segBtn, mode === m && styles.segActive]} onPress={() => setMode(m)}>
                <Text style={[styles.segText, mode === m && styles.segTextActive]}>{m}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {mode === 'Equipment' ? (
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
                {FILTERS.map((f) => (
                  <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.pill, filter === f && styles.pillActive]}>
                    <Text style={[styles.pillText, filter === f && styles.pillTextActive]}>{f}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {items.length === 0 ? (
                <View style={styles.empty}>
                  <View style={styles.emptyIcon}><Search size={30} color="#0F3D3E" /></View>
                  <Text style={styles.emptyTitle}>No matches found</Text>
                  <Text style={styles.emptyText}>We could not find anything matching your term. Try searching for Dumbbells or Cable.</Text>
                </View>
              ) : (
                <View style={styles.grid}>
                  {items.map((e) => (
                    <TouchableOpacity
                      key={e.id}
                      style={styles.card}
                      activeOpacity={0.85}
                      onPress={() => router.push({ pathname: '/tutorial/[id]', params: { id: e.id } })}
                    >
                      <View style={[styles.photo, { backgroundColor: e.color }]}>
                        <Dumbbell size={38} color="rgba(255,255,255,0.55)" />
                      </View>
                      <View style={styles.cardBody}>
                        <View style={styles.tag}><Text style={styles.tagText}>{e.tag}</Text></View>
                        <Text style={styles.cardName}>{e.name}</Text>
                        <Text style={styles.cardCount}>{e.count} exercises</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </>
          ) : routines.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}><Search size={30} color="#0F3D3E" /></View>
              <Text style={styles.emptyTitle}>No matches found</Text>
              <Text style={styles.emptyText}>Try searching for Push, Pull or Lower Body.</Text>
            </View>
          ) : (
            routines.map((r) => (
              <TouchableOpacity
                key={r.id}
                style={styles.routine}
                activeOpacity={0.85}
                onPress={() => router.push({ pathname: '/routine/[id]', params: { id: r.id } })}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.routineName}>{r.name}</Text>
                  <View style={styles.tagRow}>
                    {r.tags.map((t) => (
                      <View key={t} style={styles.tag}><Text style={styles.tagText}>{t.toUpperCase()}</Text></View>
                    ))}
                  </View>
                  <View style={styles.metaRow}>
                    <Text style={styles.cardCount}>{r.count} exercises</Text>
                    <Clock size={13} color="#8A9694" style={{ marginLeft: 12 }} />
                    <Text style={[styles.cardCount, { marginLeft: 4 }]}>{r.time}</Text>
                  </View>
                </View>
                <ChevronRight size={22} color="#8A9694" />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        <TouchableOpacity style={styles.fab} onPress={() => setSheet(true)}>
          <Sparkles size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Modal transparent animationType="slide" visible={sheet} onRequestClose={() => setSheet(false)}>
        <Pressable style={styles.overlay} onPress={() => setSheet(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Gym AI Guide</Text>
            <Text style={styles.sheetSub}>Let us identify that equipment so you can start training safely!</Text>

            <TouchableOpacity style={[styles.option, styles.optionActive]} onPress={() => { setSheet(false); router.push('/ai-camera'); }}>
              <View style={[styles.optIcon, { backgroundColor: '#FF5A36' }]}><Camera size={22} color="#FFFFFF" /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optTitle}>Take a Photo</Text>
                <Text style={styles.optSub}>Point at equipment to identify it</Text>
              </View>
              <ChevronRight size={20} color="#0F3D3E" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => { setSheet(false); router.push('/ai-chat'); }}>
              <View style={[styles.optIcon, { backgroundColor: '#0F3D3E' }]}><MessageCircle size={22} color="#FFFFFF" /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.optTitle}>Describe It</Text>
                <Text style={styles.optSub}>Tell me what it looks like</Text>
              </View>
              <ChevronRight size={20} color="#0F3D3E" />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0F4F3' },
  inner: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  content: { padding: 20, paddingTop: 56, paddingBottom: 110 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  logo: { width: 34, height: 34, borderRadius: 10, backgroundColor: '#0F3D3E', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  brand: { fontSize: 22, fontWeight: 'bold', color: '#0F3D3E' },
  search: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 14, height: 48, marginBottom: 14, borderWidth: 1, borderColor: '#E5E9E8' },
  input: { flex: 1, marginLeft: 10, fontSize: 15, color: '#0F3D3E' },
  segment: { flexDirection: 'row', backgroundColor: '#E3ECEB', borderRadius: 14, padding: 4, marginBottom: 14 },
  segBtn: { flex: 1, paddingVertical: 11, borderRadius: 11, alignItems: 'center' },
  segActive: { backgroundColor: '#0F3D3E' },
  segText: { fontWeight: '600', color: '#5C6B6A' },
  segTextActive: { color: '#FFFFFF' },
  pill: { paddingVertical: 9, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#FFFFFF', marginRight: 8, borderWidth: 1, borderColor: '#E5E9E8' },
  pillActive: { backgroundColor: '#FF5A36', borderColor: '#FF5A36' },
  pillText: { color: '#0F3D3E', fontWeight: '600', fontSize: 13 },
  pillTextActive: { color: '#FFFFFF' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 14 },
  card: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 18, overflow: 'hidden' },
  photo: { height: 104, alignItems: 'center', justifyContent: 'center' },
  cardBody: { padding: 12 },
  tag: { alignSelf: 'flex-start', backgroundColor: '#EEF2F1', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 6, marginRight: 6 },
  tagText: { fontSize: 10, fontWeight: '700', color: '#5C6B6A', letterSpacing: 0.3 },
  cardName: { fontSize: 15, fontWeight: 'bold', color: '#0F3D3E' },
  cardCount: { fontSize: 12, color: '#8A9694', marginTop: 2 },
  routine: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 12 },
  routineName: { fontSize: 17, fontWeight: 'bold', color: '#0F3D3E', marginBottom: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap' },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  empty: { alignItems: 'center', paddingTop: 50, paddingHorizontal: 20 },
  emptyIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E3ECEB', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 17, fontWeight: 'bold', color: '#0F3D3E', marginBottom: 6 },
  emptyText: { fontSize: 14, color: '#5C6B6A', textAlign: 'center', lineHeight: 20 },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 58, height: 58, borderRadius: 29, backgroundColor: '#FF5A36', alignItems: 'center', justifyContent: 'center', shadowColor: '#FF5A36', shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20, paddingBottom: 32, width: '100%', maxWidth: 480, alignSelf: 'center' },
  handle: { width: 44, height: 5, borderRadius: 3, backgroundColor: '#D5DCDB', alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 20, fontWeight: 'bold', color: '#0F3D3E', textAlign: 'center' },
  sheetSub: { fontSize: 14, color: '#5C6B6A', textAlign: 'center', marginTop: 6, marginBottom: 20 },
  option: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E5E9E8', borderRadius: 18, padding: 14, marginBottom: 12 },
  optionActive: { borderColor: '#0F3D3E', borderWidth: 2, backgroundColor: '#F0F4F3' },
  optIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  optTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F3D3E' },
  optSub: { fontSize: 13, color: '#5C6B6A', marginTop: 2 },
});