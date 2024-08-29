import 'unistyles';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import { AuthProvider } from '@/libs/apiHooks/context/tokenContext';
import { QueryPaiaProvider } from '@/libs/apiHooks/context/queryContext';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
};

export default function LayoutRaiz() {
  const { theme } = useStyles();

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <QueryPaiaProvider>
        <AuthProvider>
          <Slot initialRouteName="(tabs)" />
        </AuthProvider>
      </QueryPaiaProvider>
    </SafeAreaView>
  );
}
