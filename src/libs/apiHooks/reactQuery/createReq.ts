/* eslint-disable react-hooks/rules-of-hooks */
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { useAxios } from '../auth/useAxios';

//
type ReqType = 'query' | 'mutate';
type ReqIF<T, VQ, VM> = T extends 'query' ? VQ : T extends 'mutate' ? VM : never;

//
type ReqOptions<T, D, V> = ReqIF<T, UseQueryOptions<D>, UseMutationOptions<D, Error, V>>;
type ReqResult<T, D, V> = ReqIF<T, UseQueryResult<D>, UseMutationResult<D, Error, V>>;

//
type ReqConfig<T, D, V> = (axios: AxiosInstance) => ReqOptions<T, D, V>;
type reqHook<T, D, V> = (options: ReqOptions<T, D, V>) => ReqResult<T, D, V>;

/**
 *  Extensão do useAxios com React Query para lidar com requisições
 *
 *  AVISO: o type não pode mudar na execução, pois quebrara as regras de hook do react
 */
export default function createReq<T extends ReqType, D, V>(type: T, cbConfig: ReqConfig<T, D, V>) {
  return function useApi(options) {
    const axiosPaiado = useAxios();
    const config = cbConfig(axiosPaiado);

    return type === 'mutate'
      ? useMutation({ ...config, ...options } as UseMutationOptions)
      : useQuery({ ...config, ...options } as UseQueryOptions);
  } as reqHook<T, D, V>;
}
