import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LayoutRaiz() {
  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <Slot />
    </SafeAreaView>
  );
}
