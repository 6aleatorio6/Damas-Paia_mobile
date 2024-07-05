/* eslint-disable import/export */
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
import { useAxios } from './useAxios';

//
// tipos auxiliares
export type CbAxios<R> = (axios: AxiosInstance) => R;
type ReqType = 'mutate' | 'query';
type ReqOptions = CbAxios<UseMutationOptions | UseQueryOptions>;
type ReqResult = UseMutationResult | UseQueryResult;

// Sobrecarga para quando o type for query mostrar o tipo do useQuery e o msm acontecer para o mutate
export default function useApi<T, D = unknown, E = Error, V = void>(
  type: T & ReqType,
  cbConfig: T extends 'mutate' ? CbAxios<UseMutationOptions<D, E, V>> : CbAxios<UseQueryOptions<D, E, V>>,
): T extends 'mutate' ? UseMutationResult<D, E, V> : UseQueryResult<D, E>;

//

/**
 *  Extensão do useAxios com React Query para lidar com requisições
 *
 *  AVISO: o type não pode mudar na execução, pois quebrara as regras de hook do react
 */
export default function useApi(type: ReqType, cbConfig: ReqOptions) {
  const axiosPaiado = useAxios();
  const config = cbConfig(axiosPaiado);

  const result =
    type === 'mutate' ? useMutation(config as UseMutationOptions) : useQuery(config as UseQueryOptions);

  return result as ReqResult;
}
