import { ButtonLeftHeader } from '@/components/nav/ButtonLeftHeader';
import { Stack, useNavigation } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function Layout() {
  const { setOptions } = useNavigation();
  const { bodySec, body } = useStyles().theme.colors;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: body },
        presentation: 'fullScreenModal',
        animation: 'fade_from_bottom',
      }}
    >
      <Stack.Screen
        name="index"
        listeners={{
          focus() {
            setOptions({
              title: 'Conta',
              tabBarStyle: { backgroundColor: bodySec, flex: 0.09 },
              headerLeft: null,
            });
          },
        }}
      />
      <Stack.Screen
        name="editar"
        listeners={{
          focus(e) {
            setOptions({
              title: 'Editar Conta',
              tabBarStyle: { display: 'none' },
              headerLeft: () => <ButtonLeftHeader backTo="/(tabs)/(user)" />,
            });
          },
        }}
      />
    </Stack>
  );
}
