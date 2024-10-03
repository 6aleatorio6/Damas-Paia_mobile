import '../../unistyles';
import { Slot, SplashScreen } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';
import { AuthProvider } from '@/libs/apiHooks/auth/tokenContext';
import { QueryPaiaProvider } from '@/libs/apiHooks/reactQuery/queryContext';
import Healthcheck from '@/components/Healthcheck';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
};

export default function LayoutRaiz() {
  const { theme } = useStyles();

  return (
    <AuthProvider>
      <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: theme.colors.primary }}>
        <QueryPaiaProvider>
          <Healthcheck />
          <Slot initialRouteName="(tabs)" />
        </QueryPaiaProvider>
      </SafeAreaView>
    </AuthProvider>
  );
}
