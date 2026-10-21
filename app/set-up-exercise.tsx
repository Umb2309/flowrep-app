import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';

const EQUIPMENT = ['Dumbbells', 'Kettlebells', 'Cable Machine', 'Barbell', 'Leg Press', 'Smith Machine', 'Lat Pulldown', 'Chest Fly Machine'];

function Stepper({ label, value, onChange, min = 1, max = 30 }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.stepper}>
        <TouchableOpacity style={styles.stepBtn} onPress={() => onChange(Math.max(min, value - 1))}>
          <Minus size={20} color="#0F3D3E" />
        </TouchableOpacity>
        <Text style={styles.stepValue}>{value}</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={() => onChange(Math.min(max, value + 1))}>
          <Plus size={20} color="#0F3D3E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function SetUpExercise() {
  const router = useRouter();
  const params = useLocalSearchParams<{ equipment?: string }>();
  const [equipment, setEquipment] = useState(params.equipment ?? 'Dumbbells');
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(12);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={22} color="#0F3D3E" />
          </TouchableOpacity>
          <Text style={styles.title}>Set Up Exercise</Text>
        </View>

        <Text style={styles.label}>Select Equipment</Text>
        <View style={styles.chips}>
          {EQUIPMENT.map((e) => (
            <TouchableOpacity key={e} onPress={() => setEquipment(e)} style={[styles.chip, equipment === e && styles.chipActive]}>
              <Text style={[styles.chipText, equipment === e && styles.chipTextActive]}>{e}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          <Stepper label="Sets" value={sets} onChange={setSets} max={10} />
          <View style={{ width: 16 }} />
          <Stepper label="Reps" value={reps} onChange={setReps} max={50} />
        </View>

        <TouchableOpacity
          style={styles.startBtn}
          onPress={() => router.push({ pathname: '/active-workout', params: { equipment, sets: String(sets), reps: String(reps) } })}
        >
          <Text style={styles.startText}>Start Exercise Flow</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F3' },
  content: { padding: 20, paddingTop: 56, width: '100%', maxWidth: 480, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0F3D3E' },
  label: { fontSize: 14, fontWeight: '600', color: '#5C6B6A', marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, backgroundColor: '#FFFFFF' },
  chipActive: { backgroundColor: '#0F3D3E' },
  chipText: { color: '#0F3D3E', fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
  row: { flexDirection: 'row', marginBottom: 32 },
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 8 },
  stepBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E3ECEB', alignItems: 'center', justifyContent: 'center' },
  stepValue: { fontSize: 20, fontWeight: 'bold', color: '#0F3D3E' },
  startBtn: { backgroundColor: '#FF5A36', borderRadius: 28, paddingVertical: 18, alignItems: 'center' },
  startText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
});