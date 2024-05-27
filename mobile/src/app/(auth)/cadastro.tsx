import AuthModal from '@/components/authMolde';
import ButtonForm from '@/components/ButtonForm';
import InputText from '@/components/InputText';
import { useApi } from '@/lib/axiosApi';
import { storeProfile } from '@/lib/store/profile';

import { Link } from 'expo-router';

import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Cadastro() {
  const login = storeProfile((s) => s.login);

  const useAllValues = useState({
    nome: '',
    senha: '',
  });

  const { mutate } = useApi('mutate', (axios) => {
    return {
      async mutationFn() {
        return axios.post('/user', useAllValues[0]);
      },

      async onSuccess() {
        const { data } = await axios.post('/auth/login', useAllValues[0]);

        login(data.token);
      },

      notlogoutIfNotAuthorized: true,
    };
  });

  return (
    <AuthModal>
      <View className="pb-5">
        <InputText placeholder="nome" field="nome" valState={useAllValues} />

        <InputText
          placeholder="senha"
          field="senha"
          secureTextEntry
          valState={useAllValues}
        />
      </View>
      <View className="flex-col items-end">
        <ButtonForm onPress={mutate} className="bg-green-600 w-full">
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
