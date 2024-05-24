import { useApi } from '@/lib/axiosApi';
import { Text, View, TouchableOpacity, Image } from 'react-native';

export default function IndexProfile() {
  const { data, isPending } = useApi<{ nome: string; avatar: unknown }>(
    'query',
    (axios) => ({
      queryKey: ['profile'],
      async queryFn() {
        const res = await axios.get('/user');

        return res.data;
      },
    }),
  );

  console.log(data);

  if (isPending) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 items-center justify-center">
      <Image source={require('@/assets/icon.png')} className="w-10 h-10" />
      <Text className="text-xl font-bold mt-4">John Doe</Text>
      <TouchableOpacity
        className="bg-blue-500 px-4 py-2 mt-4 rounded"
        onPress={() => {
          // handle button change logic here
        }}
      >
        <Text className="text-white font-bold">Change</Text>
      </TouchableOpacity>
    </View>
  );
}
