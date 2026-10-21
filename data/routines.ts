export type RoutineExercise = { name: string; sets: string; reps: string; side?: boolean; muscle: string };

export type Routine = {
  id: string;
  name: string;
  tags: string[];
  time: string;
  tipTitle: string;
  tip: string;
  exercises: RoutineExercise[];
  count: number;
};

// "8-10" -> 8, "2-3" -> 2 (uses the lower end of a range)
export const num = (s: string, fallback: number) => {
  const m = s.match(/\d+/);
  return m ? parseInt(m[0], 10) : fallback;
};

export const COLORS = ['#2E4A4C', '#3C5E7A', '#8A5A3C', '#5A3C3C', '#4A5A44', '#5C3C7A'];

const make = (r: Omit<Routine, 'count'>): Routine => ({ ...r, count: r.exercises.length });

export const ROUTINES: Routine[] = [
  make({
    id: 'lower-body',
    name: 'Lower Body',
    tags: ['Glutes', 'Quads', 'Strength'],
    time: '~45 min',
    tipTitle: 'Muscle growth tip',
    tip: 'Lower each rep slowly, work close to your limit, and add reps or weight over time.',
    exercises: [
      { name: 'Barbell Hip Thrust', sets: '3', reps: '8-10', muscle: 'Glutes' },
      { name: 'Back Squat', sets: '3', reps: '6-8', muscle: 'Quads' },
      { name: 'Bulgarian Split Squat', sets: '3', reps: '8-10', side: true, muscle: 'Quads' },
      { name: 'Leg Press', sets: '3', reps: '10-12', muscle: 'Legs' },
      { name: 'Leg Extension', sets: '3', reps: '12-15', muscle: 'Quads' },
      { name: 'Hip Abduction', sets: '3', reps: '15-20', muscle: 'Glutes' },
    ],
  }),
  make({
    id: 'upper-body',
    name: 'Upper Body',
    tags: ['Back', 'Chest', 'Shoulders', 'Arms'],
    time: '~50 min',
    tipTitle: 'How to progress',
    tip: 'Reach the top of your rep range, then add a little weight. Keep your technique consistent.',
    exercises: [
      { name: 'Seated Cable Row', sets: '3', reps: '8-12', muscle: 'Back' },
      { name: 'Incline Dumbbell Press', sets: '3', reps: '8-12', muscle: 'Chest' },
      { name: 'Neutral-Grip Lat Pulldown', sets: '3', reps: '10-12', muscle: 'Back' },
      { name: 'Cable Lateral Raise', sets: '3', reps: '12-15', muscle: 'Shoulders' },
      { name: 'Cable Bicep Curl', sets: '2-3', reps: '10-15', muscle: 'Arms' },
      { name: 'Overhead Tricep Extension', sets: '2-3', reps: '10-15', muscle: 'Arms' },
    ],
  }),
  make({
    id: 'push-day',
    name: 'Push Day',
    tags: ['Chest', 'Shoulders', 'Triceps'],
    time: '~50 min',
    tipTitle: 'Do not rush your reps',
    tip: 'Lower the weight with control and use a comfortable full range of motion.',
    exercises: [
      { name: 'Bench Press', sets: '3', reps: '6-8', muscle: 'Chest' },
      { name: 'Incline Dumbbell Press', sets: '3', reps: '8-10', muscle: 'Chest' },
      { name: 'Seated Dumbbell Shoulder Press', sets: '3', reps: '8-10', muscle: 'Shoulders' },
      { name: 'Cable or Pec Deck Fly', sets: '3', reps: '10-15', muscle: 'Chest' },
      { name: 'Lateral Raises', sets: '3', reps: '12-20', muscle: 'Shoulders' },
      { name: 'Cable Tricep Pressdown', sets: '3', reps: '10-15', muscle: 'Triceps' },
    ],
  }),
  make({
    id: 'pull-day',
    name: 'Pull Day',
    tags: ['Back', 'Biceps', 'Rear Delts'],
    time: '~50 min',
    tipTitle: 'Pull with your elbows',
    tip: 'Control the stretch and let your back do the work, so every back exercise does not turn into a biceps exercise.',
    exercises: [
      { name: 'Pull-Ups or Assisted Pull-Ups', sets: '3', reps: '6-10', muscle: 'Back' },
      { name: 'Lat Pulldown', sets: '3', reps: '8-12', muscle: 'Back' },
      { name: 'Chest-Supported Row', sets: '3', reps: '8-12', muscle: 'Back' },
      { name: 'Single-Arm Cable Row', sets: '3', reps: '10-12', side: true, muscle: 'Back' },
      { name: 'Reverse Pec Deck', sets: '3', reps: '12-15', muscle: 'Rear Delts' },
      { name: 'Bicep Curls', sets: '3', reps: '10-15', muscle: 'Biceps' },
    ],
  }),
  make({
    id: 'full-body',
    name: 'Full Body',
    tags: ['Full Body', 'Strength'],
    time: '~60 min',
    tipTitle: 'Keep it steady',
    tip: 'Start with lighter weights, rest between sets, and focus on smooth breathing through every rep.',
    exercises: [
      { name: 'Goblet Squat', sets: '3', reps: '8-12', muscle: 'Legs' },
      { name: 'Dumbbell Romanian Deadlift', sets: '3', reps: '8-10', muscle: 'Hamstrings' },
      { name: 'Dumbbell Bench Press', sets: '3', reps: '8-12', muscle: 'Chest' },
      { name: 'Lat Pulldown', sets: '3', reps: '8-12', muscle: 'Back' },
      { name: 'Dumbbell Shoulder Press', sets: '3', reps: '8-12', muscle: 'Shoulders' },
      { name: 'Cable Bicep Curl', sets: '2', reps: '10-12', muscle: 'Arms' },
    ],
  }),
];