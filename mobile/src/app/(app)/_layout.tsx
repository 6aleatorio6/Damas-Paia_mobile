import TabButton from '@/components/TabButton';
import TabButtonFloat from '@/components/TabButtonFloat';
import { storeAuth } from '@/lib/logicAuth';
import { Redirect, Tabs } from 'expo-router';
import { CircleUserRound, Frown, Home } from 'lucide-react-native';

export default function LayoutHome() {
  const token = storeAuth((s) => s.token);

  if (!token) return <Redirect href={'/(auth)'} />;

  const iconSize = 1.4;

  return (
    <Tabs
      screenOptions={() => ({
        // headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: 'black',

        // styles
        tabBarItemStyle: {
          marginTop: 5,
          height: 50,
        },
        tabBarStyle: {
          height: 65,
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
  );
}
