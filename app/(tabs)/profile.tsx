import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings } from 'lucide-react-native';

const METRICS = [
  { label: 'Completed', value: '24', note: 'Workouts' },
  { label: 'Current Streak', value: '5', note: 'Days Active' },
  { label: 'Total Reps', value: '1.2k', note: 'Repetitions tracked' },
  { label: 'Weekly Time', value: '180m', note: 'Inside the zone' },
];

export default function ProfileScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Flow</Text>
        <TouchableOpacity style={styles.gear} onPress={() => router.push('/settings')}><Settings size={20} color="#0F3D3E" /></TouchableOpacity>
      </View>

      <View style={styles.userRow}>
        <View style={styles.avatar}><Text style={styles.avatarText}>AR</Text></View>
        <View>
          <Text style={styles.name}>Alex Rivers</Text>
          <Text style={styles.sub}>Flow Athlete · Joined Feb 2026</Text>
        </View>
      </View>

      <Text style={styles.section}>Progress Metrics</Text>
      <View style={styles.grid}>
        {METRICS.map((m) => (
          <View key={m.label} style={styles.stat}>
            <Text style={styles.statLabel}>{m.label}</Text>
            <Text style={styles.statValue}>{m.value}</Text>
            <Text style={styles.statNote}>{m.note}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F3' },
  content: { padding: 20, paddingTop: 56, paddingBottom: 40, width: '100%', maxWidth: 480, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0F3D3E' },
  gear: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 28 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#0F3D3E', alignItems: 'center', justifyContent: 'center', marginRight: 14, borderWidth: 3, borderColor: '#E7C79A' },
  avatarText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#0F3D3E' },
  sub: { fontSize: 13, color: '#5C6B6A', marginTop: 2 },
  section: { fontSize: 18, fontWeight: 'bold', color: '#0F3D3E', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  stat: { width: '48%', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E5E9E8' },
  statLabel: { fontSize: 13, fontWeight: '600', color: '#5C6B6A' },
  statValue: { fontSize: 32, fontWeight: 'bold', color: '#0F3D3E', marginVertical: 4 },
  statNote: { fontSize: 12, color: '#8A9694' },
});