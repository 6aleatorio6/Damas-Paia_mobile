import 'unistyles';
import { Slot, SplashScreen } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
};

export const queryClientPaia = new QueryClient();

export default function LayoutRaiz() {
  return (
    <QueryClientProvider client={queryClientPaia}>
      <Slot initialRouteName="(tabs)" />
    </QueryClientProvider>
  );
}
