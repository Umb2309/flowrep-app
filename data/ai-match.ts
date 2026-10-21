import { EQUIPMENT } from './equipment';
import type { Equipment } from './equipment';

export type MatchResult =
  | { kind: 'match'; item: Equipment }
  | { kind: 'missing'; name: string }
  | { kind: 'none' };

// Words people use to describe each piece of equipment in our library.
const KEYWORDS: Record<string, string[]> = {
  dumbbells: ['dumbbell', 'dumbbells', 'hand weight', 'hand weights', 'small weights', 'weights in each hand', 'pair of weights', 'weight rack', 'hex'],
  kettlebells: ['kettlebell', 'kettlebells', 'kettle bell', 'cannonball', 'ball with a handle', 'handle on top', 'round weight with a handle'],
  'cable-machine': ['cable', 'cables', 'pulley', 'pulleys', 'cable crossover', 'rope attachment', 'adjustable pulley', 'handle on a cable'],
  barbell: ['barbell', 'barbells', 'long bar', 'weight plates', 'plates on', 'squat rack', 'power rack', 'olympic bar'],
  'leg-press': ['leg press', 'sit and push', 'push your legs', 'push with your feet', 'push with feet', 'platform', 'sled', 'push a plate', 'push the plate', 'push the platform'],
  'smith-machine': ['smith', 'bar on rails', 'bar on a rail', 'rails', 'fixed bar', 'guided bar', 'bar that slides', 'bar that only moves up and down'],
  'lat-pulldown': ['lat', 'lats', 'pulldown', 'pull down', 'pull the bar down', 'bar above your head', 'bar overhead', 'thigh pad', 'thigh pads', 'pull bar to chest', 'bar above you'],
  'chest-fly-machine': ['pec deck', 'chest fly', 'fly machine', 'butterfly', 'pec fly', 'two handles in front', 'bring handles together', 'bring the handles together', 'handles open and close', 'arms together'],
};

// Common gym equipment we have not documented yet. We say so honestly.
const NOT_YET: { name: string; words: string[] }[] = [
  { name: 'Leg Extension Machine', words: ['leg extension', 'extension machine', 'straighten your legs', 'kick your legs', 'pad on your shins', 'pad on your ankles'] },
  { name: 'Leg Curl Machine', words: ['leg curl', 'hamstring curl', 'curl your legs', 'pad behind your ankles'] },
  { name: 'Hack Squat Machine', words: ['hack squat'] },
  { name: 'Treadmill', words: ['treadmill', 'running belt', 'running machine'] },
  { name: 'Rowing Machine', words: ['rowing machine', 'rower', 'erg'] },
  { name: 'Assisted Pull-up Machine', words: ['assisted pull', 'assisted dip', 'knee pad pull'] },
  { name: 'Hip Thrust Machine', words: ['hip thrust machine', 'glute bridge machine'] },
  { name: 'Battle Ropes', words: ['battle rope', 'battle ropes', 'heavy ropes'] },
];

export function matchEquipment(input: string): MatchResult {
  const text = ' ' + input.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  // Longer matching phrases are more specific, so they count for more.
  const score = (words: string[]) => words.reduce((sum, w) => (text.includes(' ' + w) ? sum + w.length : sum), 0);

  let bestItem: Equipment | null = null;
  let bestScore = 0;
  for (const e of EQUIPMENT) {
    const s = score([e.name.toLowerCase(), ...(KEYWORDS[e.id] ?? [])]);
    if (s > bestScore) {
      bestScore = s;
      bestItem = e;
    }
  }

  let missingName = '';
  let missingScore = 0;
  for (const m of NOT_YET) {
    const s = score(m.words);
    if (s > missingScore) {
      missingScore = s;
      missingName = m.name;
    }
  }

  if (missingScore > bestScore && missingScore >= 4) return { kind: 'missing', name: missingName };
  if (bestItem && bestScore >= 4) return { kind: 'match', item: bestItem };
  return { kind: 'none' };
}