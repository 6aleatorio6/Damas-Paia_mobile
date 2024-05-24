import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'home',
};

export const clientQuery = new QueryClient({
  defaultOptions: {
    mutations: { retry: 0 },
    queries: { retry: 2 },
  },
});

export default function LayoutRaiz() {
  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <QueryClientProvider client={clientQuery}>
        <Slot />
      </QueryClientProvider>
    </SafeAreaView>
  );
}
