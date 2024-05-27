import { clientQuery } from '@/app/_layout';
import ButtonForm from '@/components/ButtonForm';
import InputText from '@/components/InputText';
import { useApi } from '@/lib/axiosApi';
import {
  useGetProfile,
  useUpdateProfile,
} from '@/lib/querysMutations/useProfile';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, View } from 'react-native';

export default function ChangeProfile() {
  const user = useGetProfile().data;

  const stateValues = useState({
    nome: user?.nome || '',
    senha: undefined,
  });

  const { isPending, isError, mutate } = useUpdateProfile(stateValues[0]);

  return (
    <View className="px-10 pt-20 ">
      <Text className="text-2xl font-bold mb-5 dark:text-white">
        EDITAR DADOS
      </Text>
      <View className="mb-6 ">
        <InputText
          field="nome"
          placeholder="Novo nome"
          valState={stateValues}
          textName="dark:text-white"
          className="text-black mb-3"
        />
        <InputText
          field="senha"
          placeholder="Nova senha"
          valState={stateValues}
          secureTextEntry
          className="text-black  "
          textName="dark:text-white"
        />
      </View>
      <ButtonForm
        className="dark:bg-gray-400 "
        textName="dark:text-white"
        onPress={mutate}
      >
        SALVAR
      </ButtonForm>
      {isPending && <Text className="text-center">Carregando...</Text>}
      {isError && <Text className="text-center">Erro ao salvar</Text>}
    </View>
  );
}
