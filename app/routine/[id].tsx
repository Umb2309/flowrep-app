import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Dumbbell, Lightbulb, Clock } from 'lucide-react-native';
import { ROUTINES, COLORS, num } from '../../data/routines';

export default function RoutineDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const routine = ROUTINES.find((r) => r.id === id);

  if (!routine) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center', padding: 24 }]}>
        <Text style={styles.title}>Routine not found</Text>
        <TouchableOpacity style={[styles.cta, { marginTop: 16, paddingHorizontal: 32 }]} onPress={() => router.back()}>
          <Text style={styles.ctaText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const first = routine.exercises[0];

  const start = () =>
    router.push({
      pathname: '/active-workout',
      params: {
        equipment: first.name,
        sets: String(num(first.sets, 3)),
        reps: String(num(first.reps, 10)),
        routine: routine.id,
        index: '0',
        accReps: '0',
        accSets: '0',
        accSecs: '0',
      },
    });

  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={() => router.back()}>
              <ArrowLeft size={22} color="#0F3D3E" />
            </TouchableOpacity>
            <Text style={styles.title}>{routine.name}</Text>
          </View>

          <View style={styles.tagRow}>
            {routine.tags.map((t) => (
              <View key={t} style={styles.tag}>
                <Text style={styles.tagText}>{t.toUpperCase()}</Text>
              </View>
            ))}
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.meta}>{routine.count} exercises</Text>
            <Clock size={14} color="#5C6B6A" style={{ marginLeft: 14 }} />
            <Text style={[styles.meta, { marginLeft: 4 }]}>{routine.time}</Text>
          </View>

          {routine.exercises.map((ex, i) => (
            <View key={ex.name} style={styles.row}>
              <View style={[styles.thumb, { backgroundColor: COLORS[i % COLORS.length] }]}>
                <Dumbbell size={22} color="rgba(255,255,255,0.8)" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.exName}>{i + 1}. {ex.name}</Text>
                <View style={styles.muscle}>
                  <Text style={styles.muscleText}>{ex.muscle.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.pill}>
                <Text style={styles.pillText}>
                  {ex.sets} × {ex.reps}
                  {ex.side ? ' / side' : ''}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.tip}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Lightbulb size={18} color="#FF5A36" />
              <Text style={styles.tipTitle}>{routine.tipTitle.toUpperCase()}</Text>
            </View>
            <Text style={styles.tipText}>{routine.tip}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cta} onPress={start}>
            <Text style={styles.ctaText}>Start Routine</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0F4F3' },
  inner: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  content: { padding: 20, paddingTop: 56, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  back: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F3D3E' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
  tag: { backgroundColor: '#DCE9E7', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginRight: 6, marginBottom: 6 },
  tagText: { fontSize: 11, fontWeight: '700', color: '#0F3D3E', letterSpacing: 0.3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  meta: { fontSize: 13, color: '#5C6B6A' },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 12, marginBottom: 10 },
  thumb: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  exName: { fontSize: 15, fontWeight: 'bold', color: '#0F3D3E' },
  muscle: { alignSelf: 'flex-start', backgroundColor: '#EEF2F1', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2, marginTop: 5 },
  muscleText: { fontSize: 10, fontWeight: '700', color: '#5C6B6A', letterSpacing: 0.3 },
  pill: { backgroundColor: '#FF5A36', borderRadius: 14, paddingHorizontal: 11, paddingVertical: 7, marginLeft: 8 },
  pillText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  tip: { backgroundColor: '#F8EEEA', borderRadius: 16, padding: 16, marginTop: 10 },
  tipTitle: { fontSize: 12, fontWeight: 'bold', color: '#FF5A36', letterSpacing: 0.5 },
  tipText: { fontSize: 14, lineHeight: 21, color: '#0F3D3E' },
  footer: { padding: 16, paddingBottom: 24, backgroundColor: '#F0F4F3', borderTopWidth: 1, borderTopColor: '#E1E8E7' },
  cta: { backgroundColor: '#FF5A36', borderRadius: 28, paddingVertical: 17, alignItems: 'center' },
  ctaText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
});