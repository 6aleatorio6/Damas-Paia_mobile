import { queryClientPaia } from '@/app/_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook para gerenciar o token de autenticação
 */
export function useAuth() {
  const authQuery = useQuery({
    queryKey: ['token'],
    queryFn: () => AsyncStorage.getItem('token'),
    staleTime: 1000 * 60 * 60 * 24 * 7, // 1 week,
  });

  return {
    token: authQuery.data,
    async logout() {
      await AsyncStorage.removeItem('token');
      await queryClientPaia.invalidateQueries();
      await authQuery.refetch();
    },
    async setToken(token: string, rerenderization = true) {
      AsyncStorage.setItem('token', token);

      if (rerenderization) await authQuery.refetch();

      if (!rerenderization) await queryClientPaia.setQueryData(['token'], token);
    },
  };
}
