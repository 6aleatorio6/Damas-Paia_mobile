import 'unistyles';
import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
};

export default function LayoutRaiz() {
  return (
    <SafeAreaView style={{ flex: 1, height: '100%' }}>
      <Slot initialRouteName="(tabs)" />
    </SafeAreaView>
  );
}
