import { router } from 'expo-router';
import { LogInIcon, UserPlusIcon } from 'lucide-react-native';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

export default function IndexAuth() {
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
        <TouchableOpacity
          className="flex-row items-center justify-center bg-blue-600 py-3 space-x-3 rounded-lg"
          onPress={() => router.navigate('/(auth)/cadastrar')}
        >
          <Text className="text-white text-2xl text-center ">CADASTRAR</Text>
          <UserPlusIcon color="white" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center bg-gray-500 py-3 space-x-3 rounded-lg"
          onPress={() => router.navigate('/(auth)/login')}
        >
          <Text className="text-white text-2xl text-center ">ENTRAR</Text>
          <LogInIcon color="white" size={24} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
