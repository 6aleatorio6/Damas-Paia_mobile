import { Tabs } from 'expo-router';
import { LucideIcon } from 'lucide-react-native';

interface Props {
  name: string;
  title: string;
  size: number;
  Icon: LucideIcon;
}

// NÃO PODE SER CHAMADA COMO COMPONENT! TEM QUE CHAMAR COMO FUNÇÃO!
export default function TabButton({
  size: iconSize,
  name,
  title,
  Icon,
}: Props) {
  return (
    <Tabs.Screen
      name={name}
      options={{
        title,
        tabBarIcon({ size, color }) {
          return <Icon color={color} size={size * iconSize} />;
        },
      }}
    />
  );
}
