import TabButtonParear from '@/components/nav/TabButtonParear';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { useFindMatchesInProgressAndFinish } from '@/libs/apiHooks/mutations';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { Trophy, UserCircle2Icon } from 'lucide-react-native';
import { useEffect } from 'react';
import { useStyles } from 'react-native-unistyles';

export default function TabsLayout() {
  const { colors } = useStyles().theme;
  const { token } = useAuth();
  const { mutate } = useFindMatchesInProgressAndFinish({});

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (token) mutate(null); // Verifica se tem partidas em andamento ao logar
  }, [token]);

  if (!token) return <Redirect href={'/(auth)'} />;

  return (
    <Tabs
      sceneContainerStyle={{ backgroundColor: colors.body }}
      screenOptions={{
        tabBarActiveTintColor: colors.textPri,
        tabBarInactiveTintColor: colors.textSec,
        tabBarStyle: { backgroundColor: colors.bodySec, flex: 0.09 },
        tabBarLabelStyle: { fontSize: 13, bottom: '13%' },
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
      <Tabs.Screen name="index" options={{ title: 'Ranking', tabBarIcon: (p) => <Trophy {...p} /> }} />
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
