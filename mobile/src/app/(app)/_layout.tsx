import TabButton from '@/components/TabButton';
import TabButtonFloat from '@/components/TabButtonFloat';
import { storeProfile } from '@/lib/store/profile';
import useTheme from '@/lib/useTheme';
import { Redirect, Tabs } from 'expo-router';
import { CircleUserRound, Frown, Home } from 'lucide-react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LayoutApp() {
  const { setTheme, getColor } = useTheme();
  const token = storeProfile((s) => s.token);

  useEffect(() => {
    setTheme('dark');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) return <Redirect href={'/(auth)'} />;

  const iconSize = 1.4;

  return (
    <SafeAreaView className="h-full  min-h-[95vh]">
      <Tabs
        screenOptions={() => ({
          headerShown: false,
          tabBarActiveTintColor: getColor(['blue:500', 'blue:500']),
          tabBarInactiveTintColor: getColor(['gray:300', 'gray:300']),

          // styles
          tabBarItemStyle: {
            marginTop: 5,
            height: 50,
          },
          tabBarStyle: {
            height: 65,
            backgroundColor: getColor(['gray:100', 'gray:800']),
            position: 'absolute',
            borderColor: getColor(['gray:200', 'gray:700']),
          },
          tabBarLabelStyle: {
            fontSize: 11,
          },
        })}
      >
        {TabButton({
          Icon: Frown,
          size: iconSize,
          name: '(home)',
          title: 'Frases',
        })}

        {TabButtonFloat({
          Icon: Home,
          size: iconSize,
          name: 'pareamento',
          href: '(app)/pareamento',
          title: 'Jogar',
        })}

        {TabButton({
          Icon: CircleUserRound,
          size: iconSize,
          name: '(profile)',
          title: 'Meu Perfil',
        })}
      </Tabs>
    </SafeAreaView>
  );
}
