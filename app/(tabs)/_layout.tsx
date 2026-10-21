import { Tabs } from 'expo-router';
import { Home, BookOpen, BarChart3, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0F3D3E',
        tabBarInactiveTintColor: '#9CA6A5',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E9E8',
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 10),
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color }) => <Home color={color} size={26} /> }} />
      <Tabs.Screen name="library" options={{ title: 'Library', tabBarIcon: ({ color }) => <BookOpen color={color} size={26} /> }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarIcon: ({ color }) => <BarChart3 color={color} size={26} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <User color={color} size={26} /> }} />
    </Tabs>
  );
}