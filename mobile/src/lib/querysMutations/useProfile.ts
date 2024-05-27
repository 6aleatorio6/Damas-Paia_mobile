import { clientQuery } from '@/app/_layout';
import { useApi } from '../axiosApi';
import { storeProfile } from '../store/profile';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export const useGetProfile = () =>
  useApi<{ nome: string; avatar: unknown }>('query', (axios) => ({
    queryKey: ['profile'],
    async queryFn() {
      const res = await axios.get('/user');

      return res.data;
    },
  }));

export const useDeleteUser = () => {
  const loggout = storeProfile((s) => s.logout);

  return useApi('mutate', (axios) => ({
    async mutationFn() {
      return axios.delete('/user');
    },
    onSuccess() {
      loggout();
    },
  }));
};

export const useUpdateProfile = (data: { nome?: string; senha?: string }) =>
  useApi('mutate', (axios) => ({
    async mutationFn() {
      return axios.put('/user', data);
    },
    onSuccess() {
      clientQuery.refetchQueries({ queryKey: ['profile'] });
      Alert.alert('Alterado!', 'dados alterado com sucesso');
      router.back();
    },
  }));
