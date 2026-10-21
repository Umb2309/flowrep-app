import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { X, Zap, Info } from 'lucide-react-native';

type Stage = 'ready' | 'working' | 'result';

export default function AiCamera() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('ready');

  useEffect(() => {
    if (stage !== 'working') return;
    const t = setTimeout(() => setStage('result'), 1500);
    return () => clearTimeout(t);
  }, [stage]);

  return (
    <View style={styles.screen}>
      <View style={styles.inner}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.round} onPress={() => router.back()}>
            <X size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.flash}>
            <Zap size={14} color="#FFFFFF" />
            <Text style={styles.flashText}>AUTO</Text>
          </View>
        </View>

        <View style={styles.viewfinder}>
          <View style={styles.frame}>
            <View style={styles.hint}>
              <Text style={styles.hintText}>Center the equipment in frame</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          {stage === 'working' ? (
            <View style={styles.card}>
              <ActivityIndicator color="#FF5A36" />
              <Text style={styles.workText}>Identifying equipment...</Text>
            </View>
          ) : null}

          {stage === 'result' ? (
            <View style={styles.card}>
              <View style={styles.cardHead}>
                <View style={styles.cardIcon}>
                  <Info size={20} color="#0F3D3E" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTag}>COMING SOON</Text>
                  <Text style={styles.cardTitle}>Photo recognition is not connected yet</Text>
                </View>
              </View>
              <Text style={styles.cardText}>For now, describe the equipment and I will match it to the library.</Text>
              <TouchableOpacity style={styles.primary} onPress={() => router.replace('/ai-chat')}>
                <Text style={styles.primaryText}>Describe it instead</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondary} onPress={() => setStage('ready')}>
                <Text style={styles.secondaryText}>Not now</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <TouchableOpacity style={styles.shutterRing} onPress={() => setStage('working')} disabled={stage !== 'ready'}>
            <View style={styles.shutter} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#161E21' },
  inner: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 52 },
  round: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  flash: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 9 },
  flashText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 },
  viewfinder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: { width: 260, height: 260, borderRadius: 32, borderWidth: 2, borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.85)', alignItems: 'center', justifyContent: 'center' },
  hint: { backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 7 },
  hintText: { color: '#FFFFFF', fontSize: 13 },
  bottom: { paddingHorizontal: 20, paddingBottom: 36, alignItems: 'center' },
  card: { alignSelf: 'stretch', backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 24, alignItems: 'center' },
  workText: { color: '#0F3D3E', fontSize: 15, fontWeight: '600', marginTop: 10 },
  cardHead: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', marginBottom: 10 },
  cardIcon: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#DCE9E7', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cardTag: { fontSize: 11, fontWeight: 'bold', color: '#FF5A36', letterSpacing: 0.5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#0F3D3E', marginTop: 2 },
  cardText: { alignSelf: 'stretch', fontSize: 14, lineHeight: 21, color: '#5C6B6A', marginBottom: 16 },
  primary: { alignSelf: 'stretch', backgroundColor: '#FF5A36', borderRadius: 24, paddingVertical: 14, alignItems: 'center' },
  primaryText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  secondary: { alignSelf: 'stretch', borderWidth: 1, borderColor: '#D5DCDB', borderRadius: 24, paddingVertical: 13, alignItems: 'center', marginTop: 10 },
  secondaryText: { color: '#5C6B6A', fontSize: 15, fontWeight: 'bold' },
  shutterRing: { width: 80, height: 80, borderRadius: 40, borderWidth: 4, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  shutter: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#FFFFFF' },
});