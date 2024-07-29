import { router } from 'expo-router';
import { SubmitOptions } from '../form/formContext';
import { useAuth } from './authToken';
import { queryClientPaia } from '@/app/_layout';
import useApi from './useApi';
import { Alert } from 'react-native';

export const useDeleteUser = () => {
  const { logout } = useAuth();

  return useApi('mutate', (axios) => ({
    mutationFn: async () => {
      Alert.alert('Tem certeza que deseja excluir sua conta?', 'Essa ação é irreversível', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            await axios.delete('/user');
            await logout();
            await queryClientPaia.invalidateQueries();
          },
        },
      ]);
    },
  }));
};

//}
// options do form
//
export const useLogin = (): SubmitOptions => {
  const { setToken } = useAuth();

  return (axios) => ({
    async mutationFn(values) {
      const { data } = await axios.post('/auth/login', values);

      await setToken(data.token);
      router.replace('(tabs)');
    },
  });
};

export const useCadastrar = (): SubmitOptions => {
  const { setToken } = useAuth();

  return (axios) => ({
    async mutationFn(values) {
      await axios.post('/user', values);
      const { data } = await axios.post('/auth/login', values);

      await setToken(data.token);
      router.replace('(tabs)');
    },
  });
};

export const editarFormOptions: SubmitOptions = (axios) => ({
  async mutationFn(values) {
    await axios.put('/user', values);
    await queryClientPaia.invalidateQueries({ queryKey: ['user'] });
  },
  onSuccess() {
    Alert.alert('Sucesso', 'Usuário editado com sucesso');
    router.navigate('/(tabs)/(user)');
  },
});
