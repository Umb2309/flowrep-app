import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';

export type Settings = {
  mic: boolean;
  camera: boolean;
  motion: boolean;
  voice: boolean;
  handsFree: boolean;
  unit: 'lb' | 'kg';
};

const DEFAULTS: Settings = { mic: true, camera: true, motion: false, voice: true, handsFree: false, unit: 'lb' };
const KEY = 'flowrep.settings.v1';

let current: Settings = DEFAULTS;
let loaded = false;
let touched = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export async function loadSettings() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw && !touched) {
      current = { ...DEFAULTS, ...JSON.parse(raw) };
      emit();
    }
  } catch {
    // ignore: defaults are fine
  }
}

export function getSettings(): Settings {
  return current;
}

export function updateSettings(patch: Partial<Settings>) {
  touched = true;
  current = { ...current, ...patch };
  emit();
  AsyncStorage.setItem(KEY, JSON.stringify(current)).catch(() => {});
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  loadSettings();
  return () => {
    listeners.delete(cb);
  };
}

export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, getSettings, getSettings);
}