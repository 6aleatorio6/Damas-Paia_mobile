import 'unistyles';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
};

export const queryClientPaia = new QueryClient();

export default function LayoutRaiz() {
  return (
    <QueryClientProvider client={queryClientPaia}>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'gray', height: '100%' }}>
        <Slot initialRouteName="(tabs)/index" />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
