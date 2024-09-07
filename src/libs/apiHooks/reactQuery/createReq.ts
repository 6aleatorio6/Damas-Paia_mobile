import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { useAxios } from '../auth/useAxios';

// o tipo C é para pegar as opções escolhidas no callback para omitir elas do hook

/**
 *  Extensão do useAxios com React Query para lidar com requisições de mutação
 */
export function createMutation<D, V, C>(
  cbConfig: (axios: AxiosInstance) => UseMutationOptions<D, Error, V> & C,
) {
  return function useApi(options: Omit<UseMutationOptions<D, Error, V>, keyof C>) {
    const axiosPaiado = useAxios();
    const config = cbConfig(axiosPaiado);

    return useMutation({ ...config, ...options });
  };
}

/**
 *  Extensão do useAxios com React Query para lidar com requisições de query
 */
export function createQuery<D, C>(cbConfig: (axios: AxiosInstance) => UseQueryOptions<D, Error> & C) {
  return function useApi(options: Omit<UseQueryOptions<D, Error>, keyof C>) {
    const axiosPaiado = useAxios();
    const config = cbConfig(axiosPaiado);

    return useQuery({ ...config, ...options });
  };
}
