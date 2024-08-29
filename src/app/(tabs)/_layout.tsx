import { SplashScreen, Tabs } from 'expo-router';
import { Home, UserCircle2Icon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';

export default function TabsLayout() {
  const { colors } = useStyles().theme;

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.body }}
      screenOptions={{
        tabBarActiveTintColor: colors.textPri,
        tabBarInactiveTintColor: colors.textSec,
        tabBarStyle: { backgroundColor: colors.bodySec, height: '12%', paddingTop: '2%' },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: '3%' },

        headerStyle: { backgroundColor: colors.bodySec },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.textPri,
          fontWeight: 'bold',
          fontSize: 30,
          textAlign: 'center',
        },
        headerStatusBarHeight: 0,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'INICIO', tabBarIcon: (p) => <Home {...p} /> }} />
      <Tabs.Screen
        name="(user)"
        options={{ title: 'CONTA', tabBarIcon: (p) => <UserCircle2Icon {...p} />, headerShown: false }}
      />
    </Tabs>
  );
}
