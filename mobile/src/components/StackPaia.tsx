import useTheme from '@/lib/useTheme';
import { Stack } from 'expo-router';
import { PropsWithChildren } from 'react';

export default function StackPaia({ children }: PropsWithChildren) {
  const { getColor } = useTheme();

  return (
    <Stack
      screenOptions={{
        statusBarColor: getColor(['gray-100', 'gray-800']),
        statusBarStyle: 'light',
        headerStyle: {
          backgroundColor: getColor(['gray-100', 'gray-800']),
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: '400',
          fontSize: 25,
        },
        contentStyle: {
          backgroundColor: getColor(['white', 'gray-900']),
        },
        headerTintColor: getColor(['gray-900', 'white']),
      }}
    >
      {children}
    </Stack>
  );
}
