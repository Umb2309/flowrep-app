import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="tutorial/[id]" />
      <Stack.Screen name="routine/[id]" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="ai-chat" />
      <Stack.Screen name="ai-camera" />
      <Stack.Screen name="set-up-exercise" />
      <Stack.Screen name="next-up" options={{ gestureEnabled: false }} />
      <Stack.Screen name="active-workout" options={{ gestureEnabled: false }} />
      <Stack.Screen name="exercise-summary" options={{ gestureEnabled: false }} />
    </Stack>
  );
}