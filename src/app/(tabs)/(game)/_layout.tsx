/* eslint-disable no-fallthrough */
import { MatchSocketProvider } from '@/libs/apiHooks/socketIo/MatchCtx';
import { Stack, useNavigation } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function Layout() {
  const { body } = useStyles().theme.colors;
  const navigation = useNavigation();

  return (
    <MatchSocketProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: body },
          presentation: 'fullScreenModal',
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="match"
          listeners={{
            focus: (e) => {
              navigation.setOptions({
                title: 'Partida',
                tabBarStyle: { display: 'none' },
              });
            },
          }}
        />
      </Stack>
    </MatchSocketProvider>
  );
}
