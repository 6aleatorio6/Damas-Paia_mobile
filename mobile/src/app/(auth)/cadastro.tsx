import AuthModal from '@/components/authMolde';
import ButtonForm from '@/components/ButtonForm';
import InputText from '@/components/InputText';
import { useApi } from '@/lib/axiosApi';
import { storeAuth } from '@/lib/logicAuth';
import { AxiosError } from 'axios';
import { Link, router } from 'expo-router';

import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Cadastro() {
  const login = storeAuth((s) => s.login);

  const useAllValues = useState({
    nome: '',
    senha: '',
  });

  const { mutate, isPending } = useApi('mutate', (axios) => {
    return {
      async mutationFn() {
        return axios.post('/user', useAllValues[0]);
      },

      async onSuccess() {
        const { data } = await axios.post('/auth/login', useAllValues[0]);

        login(data.token);
      },
      onError(error, variables, context) {
        if (error instanceof AxiosError) console.log(error.response?.data);
      },
      notlogoutIfNotAuthorized: true,
    };
  });

  return (
    <AuthModal>
      <View className="pb-5">
        <InputText placeholder="nome" field="nome" valState={useAllValues} />
        <InputText placeholder="senha" field="senha" valState={useAllValues} />
      </View>
      <View className="flex-col items-end">
        <ButtonForm
          onPress={mutate}
          disabled={isPending}
          className="bg-green-600 w-full"
        >
          CADASTRAR
        </ButtonForm>
        <Text className="text-base mt-2  text-white mx-3">
          Já tem conta?{' '}
          <Link className="underline text-end" href={'/(auth)/login'}>
            Entre aqui!
          </Link>
        </Text>
      </View>
    </AuthModal>
  );
}
