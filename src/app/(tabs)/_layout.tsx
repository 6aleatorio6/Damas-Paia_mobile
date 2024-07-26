import { useAuth } from '@/libs/mutationOrQuery/authToken';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { Home } from 'lucide-react-native';
import { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';

export default function TabsLayout() {
  const {
    theme: { colors },
  } = useStyles();

  // AUTH
  const { token } = useAuth();
  useEffect(() => {
    if (token !== undefined) SplashScreen.hideAsync();
  }, [token]);
  if (token === undefined) return null;
  if (!token) return <Redirect href="(auth)" />;

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.body }}
      screenOptions={{
        tabBarActiveTintColor: colors.textPri,
        tabBarInactiveTintColor: colors.textSec,
        tabBarStyle: { backgroundColor: colors.bodySec, height: 60, paddingTop: 5 },
        tabBarLabelStyle: { fontSize: 12, paddingBottom: 10 },

        headerStyle: { backgroundColor: colors.bodySec },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colors.textPri,
          fontWeight: 'bold',
          fontSize: 30,
          textAlign: 'center',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'INICIO', tabBarIcon: (p) => <Home {...p} /> }} />
    </Tabs>
  );
}
