import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const clientQuery = new QueryClient({
  defaultOptions: {
    mutations: { retry: 0 },
    queries: { retry: 2, staleTime: 1000 * 60 * 30 }, // fica em cache por 30 minutos
  },
});

export default function LayoutRaiz() {
  return (
    <QueryClientProvider client={clientQuery}>
      <Slot />
    </QueryClientProvider>
  );
}
