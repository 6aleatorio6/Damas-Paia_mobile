import TabButtonParear from '@/components/nav/TabButtonParear';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { Home, UserCircle2Icon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';

export default function TabsLayout() {
  const { colors } = useStyles().theme;
  const { token } = useAuth();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
  if (!token) return <Redirect href={'/(auth)'} />;

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.body }}
      screenOptions={{
        tabBarActiveTintColor: colors.textPri,
        tabBarInactiveTintColor: colors.textSec,
        tabBarStyle: { backgroundColor: colors.bodySec },
        tabBarLabelStyle: { fontSize: 13 },

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
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: (p) => <Home {...p} /> }} />
      <Tabs.Screen
        name="(game)"
        options={{
          unmountOnBlur: true,
          tabBarButton: (p) => <TabButtonParear {...p} to="/(game)/" />,
          title: '',
        }}
      />
      <Tabs.Screen
        name="(user)"
        options={{ title: 'Conta', tabBarIcon: (p) => <UserCircle2Icon {...p} /> }}
      />
    </Tabs>
  );
}
