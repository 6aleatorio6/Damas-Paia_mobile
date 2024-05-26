import AuthModal from '@/components/authMolde';
import ButtonForm from '@/components/ButtonForm';
import InputText from '@/components/InputText';

import { useApi } from '@/lib/axiosApi';
import { storeProfile } from '@/lib/store/profile';

import { Link } from 'expo-router';

import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Login() {
  const login = storeProfile((s) => s.login);

  const useAllValues = useState({
    nome: '',
    senha: '',
  });

  const { mutate, isPending, isIdle } = useApi('mutate', (axios) => ({
    notlogoutIfNotAuthorized: true,
    async mutationFn() {
      const { data } = await axios.post('/auth/login', useAllValues[0]);

      login(data.token);
    },
  }));

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
          ENTRAR
        </ButtonForm>

        <Text className="text-base mt-2 text-white  justify-end">
          Não tem conta?{' '}
          <Link className="underline" href={'/(auth)/cadastro'}>
            Cadastra-se aqui!
          </Link>
        </Text>
      </View>
    </AuthModal>
  );
}
