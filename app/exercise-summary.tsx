import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Check, Lock, MessageCircle, AlertTriangle } from 'lucide-react-native';

function Stat({ label, value, note, locked }: { label: string; value: string; note: string; locked?: boolean }) {
  return (
    <View style={[styles.stat, locked && { opacity: 0.55 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.statLabel}>{label}</Text>
        {locked && <Lock size={14} color="#8A9694" />}
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statNote}>{note}</Text>
    </View>
  );
}

export default function ExerciseSummary() {
  const router = useRouter();
  const p = useLocalSearchParams<{ equipment?: string; sets?: string; reps?: string; seconds?: string }>();
  const secs = Number(p.seconds ?? 0);
  const time = `${Math.floor(secs / 60)}m ${String(secs % 60).padStart(2, '0')}s`;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Nice work, Alex!</Text>
          <Text style={styles.subtitle}>You crushed your {p.equipment ?? 'custom'} flow.</Text>
        </View>
        <View style={styles.check}><Check size={22} color="#0F3D3E" /></View>
      </View>

      <View style={styles.grid}>
        <Stat label="Total Reps" value={p.reps ?? '0'} note="tracked correctly" />
        <Stat label="Sets Completed" value={p.sets ?? '0'} note="great consistency" />
        <Stat label="Time Elapsed" value={time} note="including rest gaps" />
        <Stat label="Calories" value="Est. —" note="Coming Soon" locked />
      </View>

      <View style={styles.coach}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <MessageCircle size={16} color="#FF5A36" />
          <Text style={styles.coachTag}>FLOW COACHING</Text>
        </View>
        <Text style={styles.coachText}>&ldquo;Your exhale timing was strong throughout this set.&rdquo;</Text>
      </View>

      <Text style={styles.section}>Form Notes</Text>
      <View style={styles.note}>
        <AlertTriangle size={20} color="#FF5A36" />
        <Text style={styles.noteText}>Form tracking arrives with camera and motion detection. For now, focus on smooth, controlled reps.</Text>
      </View>

      <TouchableOpacity style={styles.primary} onPress={() => router.replace('/(tabs)')}>
        <Text style={styles.primaryText}>Back to Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondary} onPress={() => router.replace('/set-up-exercise')}>
        <Text style={styles.secondaryText}>Repeat This Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F3' },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40, width: '100%', maxWidth: 480, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0F3D3E' },
  subtitle: { fontSize: 14, color: '#5C6B6A', marginTop: 2 },
  check: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#DCE9E7', alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  stat: { width: '48%', flexGrow: 1, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16 },
  statLabel: { fontSize: 13, fontWeight: '600', color: '#5C6B6A' },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#0F3D3E', marginVertical: 4 },
  statNote: { fontSize: 12, color: '#8A9694' },
  coach: { backgroundColor: '#F8EEEA', borderRadius: 16, padding: 16, marginBottom: 20 },
  coachTag: { fontSize: 12, fontWeight: 'bold', color: '#FF5A36', letterSpacing: 0.5 },
  coachText: { fontSize: 16, color: '#0F3D3E' },
  section: { fontSize: 18, fontWeight: 'bold', color: '#0F3D3E', marginBottom: 10 },
  note: { flexDirection: 'row', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 28, alignItems: 'center' },
  noteText: { flex: 1, color: '#0F3D3E', fontSize: 14, lineHeight: 20 },
  primary: { backgroundColor: '#FF5A36', borderRadius: 28, paddingVertical: 18, alignItems: 'center', marginBottom: 12 },
  primaryText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  secondary: { borderWidth: 2, borderColor: '#0F3D3E', borderRadius: 28, paddingVertical: 16, alignItems: 'center' },
  secondaryText: { color: '#0F3D3E', fontSize: 17, fontWeight: 'bold' },
});