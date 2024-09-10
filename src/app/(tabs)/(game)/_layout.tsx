import { MatchSocketProvider } from '@/libs/apiHooks/socketIo/MatchCtx';
import { Stack, useNavigation } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function Layout() {
  const { setOptions } = useNavigation();
  const { body } = useStyles().theme.colors;

  return (
    <MatchSocketProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: body },
          presentation: 'fullScreenModal',
          animation: 'fade_from_bottom',
        }}
        screenListeners={{
          state({ data: { state } }) {
            if (state.index === 0) {
              setOptions({ title: '', unmountOnBlur: true, headerLeft: null });
            } else {
              setOptions({
                title: 'Partida',
                unmountOnBlur: false,
                tabBarStyle: { display: 'none' },
                headerLeft: null,
              });
            }
          },
        }}
      />
    </MatchSocketProvider>
  );
}
