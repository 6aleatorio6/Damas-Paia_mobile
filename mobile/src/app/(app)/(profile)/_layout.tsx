import StackDark from '@/components/StackPaia';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <StackDark>
      <Stack.Screen name="(index)" options={{ title: 'MEU PERFIL' }} />
      <Stack.Screen name="change" options={{ title: 'EDITAR PERFIL' }} />
    </StackDark>
  );
}
