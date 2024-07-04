import { queryClientPaia } from '@/app/_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook para gerenciar o token de autenticação
 */
export function useAuth() {
  const authQuery = useQuery({
    queryKey: ['token'],
    async queryFn() {
      return await AsyncStorage.getItem('token');
    },
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week,
  });

  return {
    token: authQuery.data,
    logout() {
      AsyncStorage.removeItem('token');
      authQuery.refetch();
    },
    setToken(token: string, rerenderization = true) {
      AsyncStorage.setItem('token', token);

      if (rerenderization) authQuery.refetch();

      if (!rerenderization) queryClientPaia.setQueryData(['token'], token);
    },
  };
}
