import AuthModal from '@/components/authMolde';
import ButtonForm from '@/components/ButtonForm';
import InputText from '@/components/InputText';
import { Link } from 'expo-router';

import { useState } from 'react';
import { Text, View } from 'react-native';

export default function Cadastro() {
  const useAllValues = useState({
    nome: '',
    senha: '',
  });

  return (
    <AuthModal>
      <View className="pb-5">
        <InputText placeholder="nome" field="nome" valState={useAllValues} />
        <InputText placeholder="senha" field="senha" valState={useAllValues} />
      </View>
      <View className="flex-col items-end">
        <ButtonForm className="bg-green-600 w-full">CADASTRAR</ButtonForm>
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
