import ButtonForm from '@/components/ButtonForm';
import ButtonLink from '@/components/ButtonLink';
import { TextPaia, ViewPaia } from '@/components/themes';
import { useDeleteUser } from '@/lib/querysMutations/useProfile';
import { storeProfile } from '@/lib/store/profile';
import { Text, View } from 'react-native';

export default function config() {
  const { mutate } = useDeleteUser();
  const loggout = storeProfile((s) => s.logout);

  return (
    <View className="flex-1 bg-black pt-1 space-y-3">
      <ButtonLink
        href="/(app)/(profile)/change"
        className="bg-blue-500 px-4 rounded-none h-[10%]"
      >
        <Text className="dark:text-white text-white text-2xl font-bold ">
          EDITAR
        </Text>
      </ButtonLink>

      <ButtonForm onPress={mutate} className="bg-red-500  h-[10%] rounded-none">
        DELETAR CONTA
      </ButtonForm>

      <ButtonForm
        onPress={loggout}
        className="bg-grau-500  h-[10%] rounded-none"
      >
        SAIR DA CONTA
      </ButtonForm>
    </View>
  );
}
