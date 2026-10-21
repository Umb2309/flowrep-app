import * as Speech from 'expo-speech';
import { getSettings } from './settings';

// Tuning knobs: lower RATE = slower speech (0.5 to 1.5)
const RATE = 0.9;
const PITCH = 1.0;

let version = 0;
let chosenVoice: string | undefined;
let voiceLookup: Promise<void> | null = null;

// Find the most natural English voice available on this device.
function pickVoice(): Promise<void> {
  if (voiceLookup) return voiceLookup;
  voiceLookup = (async () => {
    try {
      const all = await Speech.getAvailableVoicesAsync();
      const en = all.filter((v) => (v.language ?? '').toLowerCase().startsWith('en'));
      const prefer = [/natural/i, /neural/i, /online/i, /aria|jenny|guy|ava|andrew|emma|brian/i, /google us english|google uk english/i, /samantha|karen|daniel|serena/i];
      for (const re of prefer) {
        const hit = en.find((v) => re.test(v.name ?? ''));
        if (hit) {
          chosenVoice = hit.identifier;
          return;
        }
      }
      chosenVoice = en[0]?.identifier;
    } catch {
      chosenVoice = undefined;
    }
  })();
  return voiceLookup;
}

function safeStop(): Promise<void> {
  try {
    return Promise.resolve(Speech.stop()).catch(() => {});
  } catch {
    return Promise.resolve();
  }
}

// Speaks a short line. A newer line replaces an older one so cues never queue up.
export function speak(text: string, opts: { force?: boolean; rate?: number } = {}) {
  if (!opts.force && !getSettings().voice) return;
  const mine = ++version;
  Promise.all([safeStop(), pickVoice()]).then(() => {
    setTimeout(() => {
      if (mine !== version) return;
      try {
        Speech.speak(text, { language: 'en-US', voice: chosenVoice, rate: opts.rate ?? RATE, pitch: PITCH });
      } catch {
        // speech not available on this device
      }
    }, 60);
  });
}

export function stopSpeaking() {
  version++;
  safeStop();
}