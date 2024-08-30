import { ButtonLeftHeader } from '@/components/ButtonLeftHeader';
import { Stack, useNavigation } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function Layout() {
  const { setOptions } = useNavigation();
  const { bodySec } = useStyles().theme.colors;

  return (
    <Stack
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'paia' }, animation: 'fade' }}
      screenListeners={{
        state({ data: { state } }) {
          if (state.index === 0) {
            setOptions({ title: 'Conta', tabBarStyle: { backgroundColor: bodySec }, headerLeft: null });
          } else {
            setOptions({
              title: 'Editar Conta',
              tabBarStyle: { display: 'none' },
              headerLeft: () => <ButtonLeftHeader backTo="(tabs)/(user)" />,
            });
          }
        },
      }}
    />
  );
}
