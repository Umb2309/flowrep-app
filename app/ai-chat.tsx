import { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Sparkles, Send, Dumbbell } from 'lucide-react-native';
import { matchEquipment } from '../data/ai-match';
import type { Equipment } from '../data/equipment';

type Msg = { id: number; from: 'bot' | 'user'; text: string; item?: Equipment };

const SUGGESTIONS = [
  'The machine where you sit and push your legs',
  'A bar on rails with weights on the ends',
  'Pull a bar down from above you',
];

export default function AiChat() {
  const router = useRouter();
  const listRef = useRef<FlatList<Msg>>(null);
  const nextId = useRef(2);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 1,
      from: 'bot',
      text: 'Hey! Describe the equipment you are looking at: what it looks like, or what body part it seems to work.',
    },
  ]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text) return;

    const result = matchEquipment(text);
    let reply: Omit<Msg, 'id'>;
    if (result.kind === 'match') {
      reply = { from: 'bot', text: `That sounds like the ${result.item.name}! Here is a quick lookup:`, item: result.item };
    } else if (result.kind === 'missing') {
      reply = {
        from: 'bot',
        text: `That sounds like a ${result.name}, but I do not have a tutorial for that one yet. You can browse the Library, or describe it another way.`,
      };
    } else {
      reply = {
        from: 'bot',
        text: 'I could not match that to anything in the library yet. Try describing how you sit or stand, what you hold, or which body part it seems to work.',
      };
    }

    const userId = nextId.current++;
    const botId = nextId.current++;
    setMessages((m) => [...m, { id: userId, from: 'user', text }, { id: botId, ...reply }]);
    setInput('');
  };

  const openTutorial = (id: string) => router.push({ pathname: '/tutorial/[id]', params: { id } });

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <ArrowLeft size={22} color="#0F3D3E" />
          </TouchableOpacity>
          <View style={styles.avatar}>
            <Sparkles size={20} color="#FFFFFF" />
          </View>
          <View>
            <Text style={styles.name}>FlowRep Guide</Text>
            <Text style={styles.status}>Equipment finder</Text>
          </View>
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => String(m.id)}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item: m }) => (
            <View style={[styles.bubble, m.from === 'bot' ? styles.bot : styles.user]}>
              <Text style={m.from === 'bot' ? styles.botText : styles.userText}>{m.text}</Text>
              {m.item ? (
                <TouchableOpacity style={styles.result} activeOpacity={0.85} onPress={() => openTutorial(m.item!.id)}>
                  <View style={[styles.resultPhoto, { backgroundColor: m.item.color }]}>
                    <Dumbbell size={34} color="rgba(255,255,255,0.6)" />
                  </View>
                  <View style={styles.resultBody}>
                    <Text style={styles.resultName}>{m.item.name}</Text>
                    <Text style={styles.resultSub}>Excellent for building strength in {m.item.muscles}.</Text>
                    <Text style={styles.resultLink}>View Tutorial →</Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
          ListFooterComponent={
            messages.length === 1 ? (
              <View style={styles.chips}>
                {SUGGESTIONS.map((s) => (
                  <TouchableOpacity key={s} style={styles.chip} onPress={() => send(s)}>
                    <Text style={styles.chipText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null
          }
        />

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Type message or ask a question..."
            placeholderTextColor="#8A9694"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => send()}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.send} onPress={() => send()}>
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F0F4F3' },
  inner: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 14, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E9E8' },
  back: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#0F3D3E', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  name: { fontSize: 17, fontWeight: 'bold', color: '#0F3D3E' },
  status: { fontSize: 12, color: '#FF5A36', fontWeight: '600' },
  list: { padding: 16, paddingBottom: 24 },
  bubble: { maxWidth: '86%', borderRadius: 20, padding: 14, marginBottom: 12 },
  bot: { alignSelf: 'flex-start', backgroundColor: '#0F3D3E' },
  user: { alignSelf: 'flex-end', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E5E9E8' },
  botText: { color: '#FFFFFF', fontSize: 15, lineHeight: 22 },
  userText: { color: '#0F3D3E', fontSize: 15, lineHeight: 22 },
  result: { backgroundColor: '#FFFFFF', borderRadius: 16, overflow: 'hidden', marginTop: 12 },
  resultPhoto: { height: 96, alignItems: 'center', justifyContent: 'center' },
  resultBody: { padding: 14 },
  resultName: { fontSize: 16, fontWeight: 'bold', color: '#0F3D3E' },
  resultSub: { fontSize: 13, color: '#5C6B6A', marginTop: 4, lineHeight: 19 },
  resultLink: { fontSize: 14, fontWeight: 'bold', color: '#FF5A36', marginTop: 8 },
  chips: { marginTop: 4 },
  chip: { alignSelf: 'flex-start', backgroundColor: '#FFFFFF', borderRadius: 16, borderWidth: 1, borderColor: '#D5DCDB', paddingVertical: 10, paddingHorizontal: 14, marginBottom: 8 },
  chipText: { color: '#0F3D3E', fontSize: 14, fontWeight: '600' },
  inputBar: { flexDirection: 'row', alignItems: 'center', padding: 12, paddingBottom: 20, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E9E8' },
  input: { flex: 1, backgroundColor: '#F0F4F3', borderRadius: 24, paddingHorizontal: 18, height: 48, fontSize: 15, color: '#0F3D3E', marginRight: 10 },
  send: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#0F3D3E', alignItems: 'center', justifyContent: 'center' },
});