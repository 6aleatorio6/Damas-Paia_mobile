import HeaderAuth from '@/components/HeaderAuth';
import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function AuthLayout() {
  const { theme } = useStyles();

  return (
    <Stack screenOptions={{ header: HeaderAuth, contentStyle: { backgroundColor: theme.colors.body } }} />
  );
}
//
