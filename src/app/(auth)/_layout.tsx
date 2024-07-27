import HeaderAuth from '@/components/HeaderAuth';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

export default function AuthLayout() {
  const { theme } = useStyles();

  return (
    <Stack
      screenOptions={{
        header: HeaderAuth,
        contentStyle: { backgroundColor: theme.colors.body },
        statusBarColor: theme.colors.primary,
      }}
    />
  );
}
//
