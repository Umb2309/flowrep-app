import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Settings, Activity } from 'lucide-react-native';

export default function ProgressScreen() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Flow Progress</Text>
        <TouchableOpacity style={styles.gear} onPress={() => router.push('/settings')}><Settings size={20} color="#0F3D3E" /></TouchableOpacity>
      </View>

      <View style={styles.userRow}>
        <View style={styles.avatar}><Text style={styles.avatarText}>AR</Text></View>
        <View>
          <Text style={styles.name}>Alex Rivers</Text>
          <Text style={styles.sub}>Flow Athlete · Joined Feb 2026</Text>
        </View>
      </View>

      <View style={styles.empty}>
        <View style={styles.emptyIcon}><Activity size={46} color="#0F3D3E" /></View>
        <Text style={styles.emptyTitle}>Awaiting your first flow</Text>
        <Text style={styles.emptyText}>
          Your weekly activity streaks, total repetition volumes, and metrics will show up here once you log a set.
        </Text>
        <TouchableOpacity style={styles.cta} onPress={() => router.push('/set-up-exercise')}>
          <Text style={styles.ctaText}>Start a Workout</Text>
        </TouchableOpacity>
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
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 36 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#0F3D3E', alignItems: 'center', justifyContent: 'center', marginRight: 14, borderWidth: 3, borderColor: '#E7C79A' },
  avatarText: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  name: { fontSize: 18, fontWeight: 'bold', color: '#0F3D3E' },
  sub: { fontSize: 13, color: '#5C6B6A', marginTop: 2 },
  empty: { alignItems: 'center', paddingHorizontal: 12 },
  emptyIcon: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#E3ECEB', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F3D3E', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#5C6B6A', textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  cta: { backgroundColor: '#FF5A36', borderRadius: 26, paddingVertical: 15, paddingHorizontal: 34 },
  ctaText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});