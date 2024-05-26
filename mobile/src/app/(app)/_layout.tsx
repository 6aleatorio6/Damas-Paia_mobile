import TabButton from '@/components/TabButton';
import TabButtonFloat from '@/components/TabButtonFloat';
import { storeProfile } from '@/lib/store/profile';
import useTheme from '@/lib/useTheme';
import { Redirect, Tabs } from 'expo-router';
import { CircleUserRound, Frown, Home } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function LayoutHome() {
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
          tabBarActiveTintColor: getColor(['blueGray:800', 'amber:100']),
          tabBarInactiveTintColor: getColor(['blueGray:800', 'amber:100']),

          headerBackgroundContainerStyle: { backgroundColor: '' },

          // styles
          tabBarItemStyle: {
            marginTop: 5,
            height: 50,
          },
          tabBarStyle: {
            height: 65,
            backgroundColor: getColor(['blueGray:800', 'amber:100']),
            // display: usePathname() !== '/' ? 'none' : undefined,
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
