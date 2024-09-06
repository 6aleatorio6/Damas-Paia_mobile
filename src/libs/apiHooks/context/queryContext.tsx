import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const API_RETRIES = process.env['EXPO_PUBLIC_API_RETRIES'] || 3;
const API_STALE_MINUTES = process.env['EXPO_PUBLIC_API_STALE_MINUTES'] || 10;

export const queryClientPaia = new QueryClient({
  defaultOptions: {
    queries: {
      retry: +API_RETRIES,
      staleTime: 1000 * 60 * +API_STALE_MINUTES,
    },
  },
});

export function QueryPaiaProvider(props: PropsWithChildren) {
  return <QueryClientProvider client={queryClientPaia}>{props.children}</QueryClientProvider>;
}
