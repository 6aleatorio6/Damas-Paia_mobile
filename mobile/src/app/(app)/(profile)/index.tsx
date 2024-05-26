import ButtonForm from '@/components/ButtonForm';
import ButtonLink from '@/components/ButtonLink';
import { useApi } from '@/lib/axiosApi';
import useProfile from '@/lib/query/useProfile';
import { storeProfile } from '@/lib/store/profile';
import { CircleUserRound } from 'lucide-react-native';
import { Text, View, Image } from 'react-native';

export default function IndexProfile() {
  const loggout = storeProfile((s) => s.logout);

  const { data, isLoading } = useProfile();

  const { mutate } = useApi('mutate', (axios) => ({
    async mutationFn() {
      return axios.delete('/user');
    },
    onSuccess() {
      loggout();
    },
  }));

  const avatar = data?.avatar;

  if (isLoading) return <Text className="m-auto">Loading...</Text>;

  return (
    <View className="flex-1 items-center justify-center">
      <View className="space-y-3">
        <View className="flex-row   items-center ">
          {avatar ? (
            <Image source={avatar} className="w-10 h-10" />
          ) : (
            <CircleUserRound size={70} color={'black'} />
          )}
          <Text className="text-3xl text-center font-bold mx-3">
            {data?.nome}
          </Text>
        </View>
        <ButtonLink href="/(app)/(profile)/change" className="bg-blue-500 px-4">
          <Text className="text-white text-2xl font-bold">EDITAR</Text>
        </ButtonLink>

        <ButtonForm onPress={mutate} className="bg-red-500 px-4">
          DELETAR CONTA
        </ButtonForm>

        <ButtonForm onPress={loggout} className="bg-grau-500 px-4">
          SAIR DA CONTA
        </ButtonForm>
      </View>
    </View>
  );
}
