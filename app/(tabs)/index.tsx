import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>Hey, Alex</Text>
      <Text style={styles.subtitle}>Ready to find your fitness flow today?</Text>

      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/set-up-exercise')}>
        <Text style={styles.startButtonTitle}>Start Custom Workout</Text>
        <Text style={styles.startButtonSubtitle}>AI-guided form & rep tracking active</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Your Recent Flow</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Kettlebell Goblet Squat</Text>
        <Text style={styles.cardSubtitle}>Mina · 12 mins ago</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dumbbell Lateral Raise</Text>
        <Text style={styles.cardSubtitle}>Solo · Yesterday</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Seated Cable Row</Text>
        <Text style={styles.cardSubtitle}>AI Guided · 2 days ago</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F3' },
  content: { padding: 20, paddingTop: 60, width: '100%', maxWidth: 480, alignSelf: 'center' },
  greeting: { fontSize: 28, fontWeight: 'bold', color: '#0F3D3E' },
  subtitle: { fontSize: 15, color: '#5C6B6A', marginTop: 4, marginBottom: 24 },
  startButton: { backgroundColor: '#FF5A36', borderRadius: 20, padding: 20, marginBottom: 30 },
  startButtonTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  startButtonSubtitle: { color: '#FFE8E0', fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F3D3E', marginBottom: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: '#0F3D3E' },
  cardSubtitle: { fontSize: 13, color: '#8A9694', marginTop: 4 },
});