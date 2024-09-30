import { QueryClient, QueryClientProvider, QueryObserverOptions } from '@tanstack/react-query';
import axios from 'axios';
import { PropsWithChildren } from 'react';

const API_STALE_MINUTES = process.env['EXPO_PUBLIC_API_STALE_MINUTES'] || 10;

export const queryClientPaia = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * +API_STALE_MINUTES,
      throwOnError: OnErrorVerifyHealth,
      refetchOnMount: false,
      retry: 2,
    },
    mutations: { throwOnError: OnErrorVerifyHealth },
  },
});

export function QueryPaiaProvider(props: PropsWithChildren) {
  return <QueryClientProvider client={queryClientPaia}>{props.children}</QueryClientProvider>;
}

function OnErrorVerifyHealth(error: Error, query?: QueryObserverOptions) {
  const isErrorConnection = axios.isAxiosError(error) && (error.status === 503 || !error.status);
  const ishealthcheck = query?.queryKey.includes('healthcheck');

  if (isErrorConnection && !ishealthcheck) {
    queryClientPaia.refetchQueries({ queryKey: ['healthcheck'] }, { cancelRefetch: false });
  }

  return false;
}
