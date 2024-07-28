import { Slot, Stack } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

export default function Layout() {
  const { top } = useSafeAreaInsets();
  const { theme } = useStyles();

  return (
    <View style={{ flex: 1, marginTop: top * -0.97 }}>
      <Stack
        screenOptions={{
          animation: 'none',
          contentStyle: { backgroundColor: 'transparent' },

          headerStyle: { backgroundColor: theme.colors.bodySec },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: theme.colors.textPri,
            fontWeight: 'bold',
            fontSize: 30,
          },
          headerTintColor: theme.colors.textPri,
        }}
      >
        <Stack.Screen name="index" options={{ title: 'CONTA' }} />
        <Stack.Screen name="editar" options={{ title: 'EDITAR CONTA' }} />
      </Stack>
    </View>
  );
}
