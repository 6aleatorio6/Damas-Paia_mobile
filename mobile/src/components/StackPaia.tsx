import useTheme from '@/lib/useTheme';
import { Stack } from 'expo-router';
import { PropsWithChildren } from 'react';

export default function StackPaia({ children }: PropsWithChildren) {
  const { getColor } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: getColor(['lightBlue:100', 'black']),
        },
        contentStyle: {
          backgroundColor: getColor(['lightBlue:100', 'black']),
        },
        headerTintColor: getColor(['lightBlue:100', 'black']),
      }}
    >
      {children}
    </Stack>
  );
}
