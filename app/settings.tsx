import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mic, Camera, Activity, Volume2 } from 'lucide-react-native';
import { useSettings, updateSettings } from '../lib/settings';
import type { Settings } from '../lib/settings';
import { speak } from '../lib/voice';

type IconType = typeof Mic;

function PermissionRow({ Icon, title, sub, value, onChange }: { Icon: IconType; title: string; sub: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <View style={styles.permCard}>
      <View style={styles.permIcon}>
        <Icon size={20} color="#0F3D3E" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{sub}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: '#B8C4C3', true: '#0F3D3E' }} thumbColor="#FFFFFF" />
    </View>
  );
}

function PrefRow({ title, sub, value, onChange, last }: { title: string; sub: string; value: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  return (
    <View style={[styles.prefRow, !last && styles.prefBorder]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub}>{sub}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: '#B8C4C3', true: '#0F3D3E' }} thumbColor="#FFFFFF" />
    </View>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const stored = useSettings();
  const [draft, setDraft] = useState<Partial<Settings>>({});
  const v: Settings = { ...stored, ...draft };

  const change = <K extends keyof Settings>(key: K, value: Settings[K]) => setDraft((d) => ({ ...d, [key]: value }));

  const leave = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };

  const save = () => {
    updateSettings(draft);
    leave();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={leave}>
              <ArrowLeft size={22} color="#0F3D3E" />
            </TouchableOpacity>
            <Text style={styles.title}>Setup & Permissions</Text>
          </View>

          <Text style={styles.h2}>Why permissions matter</Text>
          <Text style={styles.para}>
            To provide precise coaching and hands-free control, FlowRep uses on-device sensors. Your data stays securely on your phone.
          </Text>

          <PermissionRow Icon={Mic} title="Microphone" sub="For voice coaching and audio cues" value={v.mic} onChange={(x) => change('mic', x)} />
          <PermissionRow Icon={Camera} title="Camera (optional)" sub="To help estimate your reps automatically" value={v.camera} onChange={(x) => change('camera', x)} />
          <PermissionRow Icon={Activity} title="Motion Sensors (optional)" sub="To detect movement during your set" value={v.motion} onChange={(x) => change('motion', x)} />

          <Text style={[styles.h2, { marginTop: 24 }]}>Application Preferences</Text>
          <View style={styles.prefCard}>
            <PrefRow title="Voice Coaching" sub="Hear counting and breathing cues" value={v.voice} onChange={(x) => change('voice', x)} />
            <PrefRow title="Hands-Free Autoplay" sub="Move to the next exercise automatically" value={v.handsFree} onChange={(x) => change('handsFree', x)} />
            <View style={styles.prefRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>Preferred Weight Units</Text>
                <Text style={styles.rowSub}>Standard unit of calculation</Text>
              </View>
              <View style={styles.unitWrap}>
                {(['lb', 'kg'] as const).map((u) => (
                  <TouchableOpacity key={u} style={[styles.unitBtn, v.unit === u && styles.unitActive]} onPress={() => change('unit', u)}>
                    <Text style={[styles.unitText, v.unit === u && styles.unitTextActive]}>{u}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.sample, !v.voice && { opacity: 0.4 }]}
            disabled={!v.voice}
            onPress={() => speak('Set 1 of 4. Ready, and begin. Breathe in. One. Exhale as you push.', { force: true })}
          >
            <Volume2 size={18} color="#0F3D3E" />
            <Text style={styles.sampleText}>Play sample coaching cue</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.cta} onPress={save}>
            <Text style={styles.ctaText}>Save and Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skip} onPress={leave}>
            <Text style={styles.skipText}>Skip for now — enable later in Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0F4F3' },
  inner: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  content: { padding: 20, paddingTop: 56, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  back: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0F3D3E' },
  h2: { fontSize: 17, fontWeight: 'bold', color: '#0F3D3E', marginBottom: 8 },
  para: { fontSize: 14, lineHeight: 21, color: '#5C6B6A', marginBottom: 16 },
  permCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E5E9E8' },
  permIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: '#E3ECEB', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rowTitle: { fontSize: 15, fontWeight: 'bold', color: '#0F3D3E' },
  rowSub: { fontSize: 12, color: '#5C6B6A', marginTop: 2 },
  prefCard: { backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 16, borderWidth: 1, borderColor: '#E5E9E8' },
  prefRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  prefBorder: { borderBottomWidth: 1, borderBottomColor: '#EDF1F0' },
  unitWrap: { flexDirection: 'row', backgroundColor: '#EEF2F1', borderRadius: 10, padding: 3 },
  unitBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 8 },
  unitActive: { backgroundColor: '#0F3D3E' },
  unitText: { fontSize: 13, fontWeight: 'bold', color: '#5C6B6A' },
  unitTextActive: { color: '#FFFFFF' },
  sample: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: '#0F3D3E', borderRadius: 22, paddingVertical: 13, marginTop: 18 },
  sampleText: { color: '#0F3D3E', fontSize: 15, fontWeight: 'bold' },
  footer: { padding: 16, paddingBottom: 24, backgroundColor: '#F0F4F3', borderTopWidth: 1, borderTopColor: '#E1E8E7' },
  cta: { backgroundColor: '#0F3D3E', borderRadius: 28, paddingVertical: 17, alignItems: 'center' },
  ctaText: { color: '#FFFFFF', fontSize: 17, fontWeight: 'bold' },
  skip: { paddingVertical: 14, alignItems: 'center' },
  skipText: { color: '#5C6B6A', fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' },
});