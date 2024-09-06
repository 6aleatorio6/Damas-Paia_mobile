import HeaderAuth from '@/components/nav/HeaderAuth';
import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function AuthLayout() {
  const { theme } = useStyles();

  return (
    <Stack
      screenOptions={{
        header: HeaderAuth,
        statusBarColor: theme.colors.primary,
        contentStyle: { backgroundColor: theme.colors.body },
        presentation: 'fullScreenModal',
      }}
    />
  );
}
//
