import { router, Tabs } from 'expo-router';

import { LucideIcon, PlayIcon } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { Text, View } from 'react-native';

interface IconProps {
  focused?: boolean;
  color?: string;
  size: number;
  href: string;
}

interface Props {
  href: string;
  title: string;
  size: number;
  name: string;
  Icon: LucideIcon;
}

// NÃO PODE SER CHAMADA COMO COMPONENT! TEM QUE CHAMAR COMO FUNÇÃO!
export default function TabButtonFloat({
  size,
  href,
  title,
  Icon,
  name,
}: Props) {
  return (
    <Tabs.Screen
      name={name}
      options={{
        title,
        tabBarButton() {
          return <ButtonFloat href={href} size={21 * size} />;
        },
      }}
    />
  );
}

function ButtonFloat({ size, href }: IconProps) {
  return (
    <View className="flex-1 bottom-5">
      <Pressable
        className="  bg-blue-500 rounded-full h-16 w-full   flex-row justify-center  items-center  "
        onPress={() => router.navigate(href)}
      >
        <Text className="font-bold text-white text-2xl  ">INICIAR</Text>
        <PlayIcon color="white" size={30} />
      </Pressable>
    </View>
  );
}
