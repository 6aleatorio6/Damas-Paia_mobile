import Button from '@/components/Button';
import { LogInIcon, UserPlusIcon } from 'lucide-react-native';
import { ImageBackground, Text, View } from 'react-native';

export default function Index() {
  const image = require('@/assets/splash.png');

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      className="flex-1 justify-between items-center bg-gray-900"
    >
      <Text className="text-4xl mt-20 text-center text-white">
        Bem-vindo ao Damas Paia 2.0
      </Text>

      <View className="w-4/5 mb-20 space-y-4">
        <Button href="/(auth)/cadastro" className="bg-blue-600">
          <Text className="text-white text-2xl text-center ">CADASTRAR</Text>
          <UserPlusIcon color="white" size={24} />
        </Button>

        <Button href="/(auth)/login">
          <Text className="text-white text-2xl text-center ">ENTRAR</Text>
          <LogInIcon color="white" size={24} />
        </Button>
      </View>
    </ImageBackground>
  );
}
