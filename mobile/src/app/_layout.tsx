import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const clientQuery = new QueryClient({
  defaultOptions: {
    mutations: { retry: 0 },
    queries: { retry: 2 },
  },
});

export default function LayoutRaiz() {
  console.log('sas');

  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <QueryClientProvider client={clientQuery}>
        <Slot />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
