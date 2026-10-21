import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Dumbbell, Check, Wind, AlertTriangle, ShieldCheck, Info } from 'lucide-react-native';
import { EQUIPMENT } from '../../data/equipment';

function Steps({ items }: { items: string[] }) {
  return (
    <View>
      {items.map((s, i) => (
        <View key={s} style={styles.step}>
          <View style={styles.num}>
            <Text style={styles.numText}>{i + 1}</Text>
          </View>
          <Text style={styles.stepText}>{s}</Text>
        </View>
      ))}
    </View>
  );
}

function Bullets({ items, color, Icon }: { items: string[]; color: string; Icon: typeof AlertTriangle }) {
  return (
    <View>
      {items.map((s) => (
        <View key={s} style={styles.bullet}>
          <Icon size={18} color={color} style={{ marginTop: 2 }} />
          <Text style={styles.bulletText}>{s}</Text>
        </View>
      ))}
    </View>
  );
}

export default function TutorialDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [learned, setLearned] = useState(false);
  const item = EQUIPMENT.find((e) => e.id === id);

  if (!item) {
    return (
      <View style={[styles.screen, { alignItems: 'center', justifyContent: 'center', padding: 24 }]}>
        <Text style={styles.h2}>Equipment not found</Text>
        <TouchableOpacity style={[styles.primary, { marginTop: 16, paddingHorizontal: 32 }]} onPress={() => router.back()}>
          <Text style={styles.primaryText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
          <View style={[styles.hero, { backgroundColor: item.color }]}>
            <Dumbbell size={84} color="rgba(255,255,255,0.35)" />
            <TouchableOpacity style={styles.back} onPress={() => router.back()}>
              <ArrowLeft size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>Best for {item.muscles}</Text>
            <View style={styles.divider} />

            <View style={styles.sectionRow}>
              <Info size={18} color="#0F3D3E" />
              <Text style={styles.h2}>What is it?</Text>
            </View>
            <Text style={styles.para}>{item.what}</Text>

            <Text style={styles.h2}>Step-by-step Setup</Text>
            <Steps items={item.setup} />

            <Text style={styles.h2}>How to position yourself</Text>
            <Steps items={item.position} />

            <Text style={styles.h2}>How to perform the movement</Text>
            <Steps items={item.movement} />

            <View style={styles.breath}>
              <View style={styles.sectionRow}>
                <Wind size={18} color="#FF5A36" />
                <Text style={styles.breathTag}>BREATHING</Text>
              </View>
              <Text style={styles.breathText}>{item.breathing}</Text>
            </View>

            <Text style={styles.h2}>Common mistakes</Text>
            <Bullets items={item.mistakes} color="#FF5A36" Icon={AlertTriangle} />

            <Text style={[styles.h2, { marginTop: 20 }]}>Safety</Text>
            <Bullets items={item.safety} color="#0F3D3E" Icon={ShieldCheck} />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.primary, learned && { backgroundColor: '#2E7D5B' }]}
            onPress={() => setLearned((v) => !v)}
          >
            {learned ? <Check size={20} color="#FFFFFF" style={{ marginRight: 8 }} /> : null}
            <Text style={styles.primaryText}>{learned ? 'Learned' : 'Mark as Learned'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondary}
            onPress={() => router.push({ pathname: '/set-up-exercise', params: { equipment: item.name } })}
          >
            <Text style={styles.secondaryText}>Start a workout with this</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0F4F3' },
  inner: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  hero: { height: 230, alignItems: 'center', justifyContent: 'center' },
  back: { position: 'absolute', top: 48, left: 20, width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  badge: { position: 'absolute', top: 54, right: 20, backgroundColor: 'rgba(0,0,0,0.35)', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 },
  body: { padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0F3D3E' },
  subtitle: { fontSize: 14, color: '#5C6B6A', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#DCE3E2', marginVertical: 18 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  h2: { fontSize: 18, fontWeight: 'bold', color: '#0F3D3E', marginTop: 20, marginBottom: 10 },
  para: { fontSize: 15, lineHeight: 22, color: '#2A3A3A' },
  step: { flexDirection: 'row', marginBottom: 14 },
  num: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#DCE9E7', alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 1 },
  numText: { fontSize: 13, fontWeight: 'bold', color: '#0F3D3E' },
  stepText: { flex: 1, fontSize: 15, lineHeight: 22, color: '#2A3A3A' },
  breath: { backgroundColor: '#F8EEEA', borderRadius: 16, padding: 16, marginTop: 8 },
  breathTag: { fontSize: 12, fontWeight: 'bold', color: '#FF5A36', letterSpacing: 0.5 },
  breathText: { fontSize: 15, lineHeight: 22, color: '#0F3D3E', marginTop: 8 },
  bullet: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  bulletText: { flex: 1, fontSize: 15, lineHeight: 21, color: '#2A3A3A' },
  footer: { padding: 16, paddingBottom: 24, backgroundColor: '#F0F4F3', borderTopWidth: 1, borderTopColor: '#E1E8E7' },
  primary: { flexDirection: 'row', backgroundColor: '#0F3D3E', borderRadius: 28, paddingVertical: 17, alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  secondary: { paddingVertical: 12, alignItems: 'center', marginTop: 4 },
  secondaryText: { color: '#FF5A36', fontSize: 15, fontWeight: 'bold' },
});