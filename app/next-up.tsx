import { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Redirect, useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { ROUTINES, num } from '../data/routines';
import { speak, stopSpeaking } from '../lib/voice';
import { useSettings } from '../lib/settings';

const AUTO_MS = 8000;
const spoken = (s: string) => s.replace('-', ' to ');

export default function NextUp() {
  const router = useRouter();
  const p = useLocalSearchParams<{ routine?: string; index?: string; accReps?: string; accSets?: string; accSecs?: string }>();
  const { handsFree } = useSettings();

  const routine = ROUTINES.find((r) => r.id === p.routine);
  const index = Number(p.index ?? 0);
  const ex = routine?.exercises[index];
  const accReps = p.accReps ?? '0';
  const accSets = p.accSets ?? '0';
  const accSecs = p.accSecs ?? '0';

  const next = useCallback(() => {
    if (!routine || !ex) return;
    router.replace({
      pathname: '/active-workout',
      params: {
        equipment: ex.name,
        sets: String(num(ex.sets, 3)),
        reps: String(num(ex.reps, 10)),
        routine: routine.id,
        index: String(index),
        accReps,
        accSets,
        accSecs,
      },
    });
  }, [router, routine, ex, index, accReps, accSets, accSecs]);

  const finish = useCallback(() => {
    router.replace({
      pathname: '/exercise-summary',
      params: { equipment: routine?.name ?? 'custom', sets: accSets, reps: accReps, seconds: accSecs },
    });
  }, [router, routine, accReps, accSets, accSecs]);

  useEffect(() => {
    if (!ex) return;
    speak(`Next up: ${ex.name}. ${spoken(ex.sets)} sets of ${spoken(ex.reps)}${ex.side ? ' per side' : ''}.`);
    return () => stopSpeaking();
  }, [ex]);

  useEffect(() => {
    if (!handsFree || !ex) return;
    const t = setTimeout(next, AUTO_MS);
    return () => clearTimeout(t);
  }, [handsFree, ex, next]);

  if (!routine || !ex) {
    return <Redirect href={{ pathname: '/exercise-summary', params: { equipment: 'custom', sets: accSets, reps: accReps, seconds: accSecs } }} />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <Text style={styles.kicker}>EXERCISE {index} DONE</Text>
        <Text style={styles.progress}>
          {index} of {routine.count} complete
        </Text>

        <View style={styles.card}>
          <Text style={styles.nextLabel}>NEXT UP</Text>
          <Text style={styles.name}>{ex.name}</Text>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {ex.sets} × {ex.reps}
              {ex.side ? ' / side' : ''}
            </Text>
          </View>
          <Text style={styles.hint}>
            {handsFree
              ? 'Hands-free is on. Starting automatically in a few seconds.'
              : 'Get into position, take a breath, and continue when you are ready.'}
          </Text>
        </View>

        <TouchableOpacity style={styles.cta} onPress={next}>
          <Text style={styles.ctaText}>Continue</Text>
          <ArrowRight size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={finish}>
          <Text style={styles.linkText}>Finish routine here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0B1418' },
  inner: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', padding: 24, justifyContent: 'center' },
  kicker: { color: '#FF5A36', fontWeight: 'bold', fontSize: 13, letterSpacing: 1, textAlign: 'center' },
  progress: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 4, marginBottom: 32 },
  card: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 32 },
  nextLabel: { color: '#8FA3A3', fontSize: 12, fontWeight: 'bold', letterSpacing: 1 },
  name: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginTop: 8, marginBottom: 14 },
  pill: { backgroundColor: '#FF5A36', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 8 },
  pillText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  hint: { color: '#8FA3A3', fontSize: 14, textAlign: 'center', marginTop: 18, lineHeight: 20 },
  cta: { flexDirection: 'row', backgroundColor: '#FF5A36', borderRadius: 28, paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  link: { paddingVertical: 16, alignItems: 'center' },
  linkText: { color: '#8FA3A3', fontSize: 15, fontWeight: '600' },
});