import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Pause, Play, Square } from 'lucide-react-native';
import { ROUTINES } from '../data/routines';
import { speak, stopSpeaking } from '../lib/voice';

const TICK_MS = 2000; // one breath phase; a full rep = 2 ticks (4 seconds)
const REST_SECONDS = 60;
const READY_MS = 6500; // time for the "get in position" line before counting starts
const WRAP_MS = 3500; // time for the "complete" line before moving on

type Cue = { id: number; text: string };

type State = {
  set: number;
  reps: number;
  phase: 'out' | 'in';
  resting: boolean;
  rest: number;
  getReady: boolean;
  caption: string;
  cue: Cue;
  finished: boolean;
};

type Action =
  | { type: 'go' }
  | { type: 'tick'; totalReps: number; totalSets: number }
  | { type: 'restTick'; totalSets: number };

const say = (state: State, caption: string, text: string): Pick<State, 'caption' | 'cue'> => ({
  caption,
  cue: { id: state.cue.id + 1, text },
});

const makeInitial = (equipment: string, totalSets: number): State => ({
  set: 1,
  reps: 0,
  phase: 'out',
  resting: false,
  rest: REST_SECONDS,
  getReady: true,
  caption: 'Ready... and begin.',
  cue: { id: 1, text: `${equipment}. Set 1 of ${totalSets}. Get in position. Ready, and begin.` },
  finished: false,
});

function reducer(state: State, action: Action): State {
  if (state.finished) return state;

  if (action.type === 'go') {
    return state.getReady ? { ...state, getReady: false } : state;
  }

  if (action.type === 'tick') {
    if (state.resting || state.getReady) return state;
    if (state.phase === 'out') {
      const early = state.reps < 2;
      return { ...state, phase: 'in', ...say(state, 'Breathe in.', early ? 'Breathe in.' : 'In.') };
    }
    const reps = state.reps + 1;
    if (reps < action.totalReps) {
      const early = reps <= 2;
      return {
        ...state,
        reps,
        phase: 'out',
        ...say(state, 'Exhale as you push.', early ? `${reps}. Breathe out.` : `${reps}. Out.`),
      };
    }
    if (state.set >= action.totalSets) {
      return {
        ...state,
        reps,
        phase: 'out',
        finished: true,
        ...say(state, 'Exercise complete. Great work.', `${reps}. Exercise complete. Great work.`),
      };
    }
    return {
      ...state,
      reps,
      phase: 'out',
      resting: true,
      rest: REST_SECONDS,
      ...say(state, `Nice work. Set ${state.set} done.`, `${reps}. Set ${state.set} done. Rest for ${REST_SECONDS} seconds.`),
    };
  }

  // rest countdown
  if (!state.resting) return state;
  const rest = state.rest - 1;
  if (rest > 0) {
    if (rest === 10) return { ...state, rest, ...say(state, 'Ten seconds left.', 'Ten seconds left.') };
    return { ...state, rest };
  }
  const nextSet = state.set + 1;
  return {
    ...state,
    set: nextSet,
    reps: 0,
    phase: 'out',
    resting: false,
    rest: REST_SECONDS,
    getReady: true,
    ...say(
      state,
      `Set ${nextSet} of ${action.totalSets}. Ready... and begin.`,
      `Time is up. Set ${nextSet} of ${action.totalSets}. Get in position. Ready, and begin.`
    ),
  };
}

export default function ActiveWorkout() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    equipment?: string;
    sets?: string;
    reps?: string;
    routine?: string;
    index?: string;
    accReps?: string;
    accSets?: string;
    accSecs?: string;
  }>();

  const totalSets = Number(params.sets ?? 4);
  const totalReps = Number(params.reps ?? 12);
  const equipment = params.equipment ?? 'Dumbbells';
  const routineId = params.routine ?? '';
  const index = Number(params.index ?? 0);
  const accReps = Number(params.accReps ?? 0);
  const accSets = Number(params.accSets ?? 0);
  const accSecs = Number(params.accSecs ?? 0);

  const routine = ROUTINES.find((r) => r.id === routineId);
  const exerciseCount = routine ? routine.exercises.length : 0;
  const routineName = routine ? routine.name : '';

  const [state, dispatch] = useReducer(reducer, { equipment, totalSets }, (a) => makeInitial(a.equipment, a.totalSets));
  const [paused, setPaused] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const goTo = useCallback(
    (stopEarly: boolean) => {
      const exReps = (state.set - 1) * totalReps + state.reps;
      const exSets = state.finished || state.resting ? state.set : state.set - 1;
      const exSecs = Math.round((Date.now() - startedAt.current) / 1000);
      const reps = accReps + exReps;
      const sets = accSets + exSets;
      const secs = accSecs + exSecs;

      if (!stopEarly && routineId && index + 1 < exerciseCount) {
        router.replace({
          pathname: '/next-up',
          params: {
            routine: routineId,
            index: String(index + 1),
            accReps: String(reps),
            accSets: String(sets),
            accSecs: String(secs),
          },
        });
        return;
      }
      router.replace({
        pathname: '/exercise-summary',
        params: {
          equipment: routineName || equipment,
          sets: String(sets),
          reps: String(reps),
          seconds: String(secs),
        },
      });
    },
    [router, equipment, routineId, routineName, exerciseCount, index, accReps, accSets, accSecs, totalReps, state.set, state.reps, state.resting, state.finished]
  );

  // speak every new coaching line
  useEffect(() => {
    speak(state.cue.text);
  }, [state.cue]);

  // silence the voice when paused or when leaving the screen
  useEffect(() => {
    if (paused) stopSpeaking();
  }, [paused]);
  useEffect(() => () => stopSpeaking(), []);

  // short pause after "ready, and begin" before the first rep
  useEffect(() => {
    if (!state.getReady || paused) return;
    const t = setTimeout(() => dispatch({ type: 'go' }), READY_MS);
    return () => clearTimeout(t);
  }, [state.getReady, paused]);

  // rep + breathing loop
  useEffect(() => {
    if (paused || state.resting || state.finished || state.getReady) return;
    const id = setInterval(() => dispatch({ type: 'tick', totalReps, totalSets }), TICK_MS);
    return () => clearInterval(id);
  }, [paused, state.resting, state.finished, state.getReady, totalReps, totalSets]);

  // rest countdown loop
  useEffect(() => {
    if (paused || !state.resting || state.finished) return;
    const id = setInterval(() => dispatch({ type: 'restTick', totalSets }), 1000);
    return () => clearInterval(id);
  }, [paused, state.resting, state.finished, totalSets]);

  // after the last rep, let the closing line finish, then move on
  useEffect(() => {
    if (!state.finished) return;
    const t = setTimeout(() => goTo(false), WRAP_MS);
    return () => clearTimeout(t);
  }, [state.finished, goTo]);

  const pct = exerciseCount > 0 ? Math.round(((index + 1) / exerciseCount) * 100) : 0;

  const guide = state.resting
    ? 'Rest and breathe slowly'
    : state.getReady
      ? 'Get in position'
      : `Breathing guide: ${state.phase === 'out' ? 'Exhale on contraction' : 'Inhale on return'}`;

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        {routine ? (
          <View style={styles.progressWrap}>
            <Text style={styles.progressText}>
              Exercise {index + 1} of {exerciseCount}
            </Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${pct}%` }]} />
            </View>
          </View>
        ) : null}

        <Text style={styles.kicker}>{equipment.toUpperCase()}</Text>
        <Text style={styles.setText}>Set {state.set} of {totalSets}</Text>

        <View style={styles.ringOuter}>
          <View style={styles.ringMid}>
            <View style={[styles.circle, state.phase === 'in' && !state.resting && { transform: [{ scale: 0.92 }] }]}>
              {state.resting ? (
                <>
                  <Text style={styles.count}>{Math.max(state.rest, 0)}</Text>
                  <Text style={styles.countLabel}>REST SEC</Text>
                </>
              ) : (
                <>
                  <Text style={styles.count}>{state.reps}</Text>
                  <Text style={styles.countLabel}>OF {totalReps} REPS</Text>
                </>
              )}
            </View>
          </View>
        </View>

        <Text style={styles.guide}>{guide}</Text>

        <View style={styles.caption}>
          <Text style={styles.captionText}>&ldquo;{state.caption}&rdquo;</Text>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.pauseBtn} onPress={() => setPaused((p) => !p)}>
            {paused ? <Play size={24} color="#FFFFFF" /> : <Pause size={24} color="#FFFFFF" />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.stopBtn} onPress={() => goTo(true)}>
            <Square size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1418' },
  inner: { flex: 1, alignItems: 'center', paddingTop: 56, paddingHorizontal: 20, width: '100%', maxWidth: 480, alignSelf: 'center' },
  progressWrap: { alignSelf: 'stretch', marginBottom: 22 },
  progressText: { color: '#8FA3A3', fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  track: { height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.12)', overflow: 'hidden' },
  fill: { height: 5, borderRadius: 3, backgroundColor: '#FF5A36' },
  kicker: { color: '#FF5A36', fontWeight: 'bold', fontSize: 13, letterSpacing: 1, textAlign: 'center' },
  setText: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginTop: 4, marginBottom: 32 },
  ringOuter: { width: 280, height: 280, borderRadius: 140, backgroundColor: 'rgba(20,70,70,0.25)', alignItems: 'center', justifyContent: 'center' },
  ringMid: { width: 230, height: 230, borderRadius: 115, backgroundColor: 'rgba(255,90,54,0.12)', alignItems: 'center', justifyContent: 'center' },
  circle: { width: 176, height: 176, borderRadius: 88, backgroundColor: '#FF5A36', alignItems: 'center', justifyContent: 'center' },
  count: { color: '#FFFFFF', fontSize: 64, fontWeight: 'bold' },
  countLabel: { color: '#FFE8E0', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  guide: { color: '#8FA3A3', fontSize: 15, marginTop: 32 },
  caption: { marginTop: 32, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 20, alignSelf: 'stretch', alignItems: 'center' },
  captionText: { color: '#FFFFFF', fontSize: 16 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: 32 },
  pauseBtn: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  stopBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#FF5A36', alignItems: 'center', justifyContent: 'center' },
});