import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

export const queryClientPaia = new QueryClient();

export function QueryPaiaProvider(props: PropsWithChildren) {
  return <QueryClientProvider client={queryClientPaia}>{props.children}</QueryClientProvider>;
}
