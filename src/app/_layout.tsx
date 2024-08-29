import 'unistyles';
import { Slot, SplashScreen } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
};

export const queryClientPaia = new QueryClient();

export default function LayoutRaiz() {
  const { theme } = useStyles();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.primary }}>
        <AuthProvider>
          <Slot initialRouteName="(tabs)" />
        </AuthProvider>
    </SafeAreaView>
  );
}
