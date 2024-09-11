import { QueryClient, QueryClientProvider, QueryObserverOptions } from '@tanstack/react-query';
import axios from 'axios';
import { PropsWithChildren } from 'react';

const API_RETRIES = process.env['EXPO_PUBLIC_API_RETRIES'] || 3;
const API_STALE_MINUTES = process.env['EXPO_PUBLIC_API_STALE_MINUTES'] || 10;

export const queryClientPaia = new QueryClient({
  defaultOptions: {
    queries: {
      retry: +API_RETRIES,
      staleTime: 1000 * 60 * +API_STALE_MINUTES,
      throwOnError: OnErrorVerifyHealth,
    },
    mutations: {
      throwOnError: OnErrorVerifyHealth,
    },
  },
});

export function QueryPaiaProvider(props: PropsWithChildren) {
  return <QueryClientProvider client={queryClientPaia}>{props.children}</QueryClientProvider>;
}

function OnErrorVerifyHealth(error: Error, query?: QueryObserverOptions) {
  const ishealthcheck = query?.queryKey.includes('healthcheck');
  const isErrorAxios = axios.isAxiosError(error);
  if (ishealthcheck || !isErrorAxios) return false;

  const isErrorConnection = error.status === 503 || error.status === 0 || !error.response;
  if (isErrorConnection) {
    queryClientPaia.refetchQueries({ queryKey: ['healthcheck'] }, { cancelRefetch: false });
  }

  return false;
}
