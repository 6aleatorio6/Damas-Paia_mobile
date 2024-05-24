import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: 'auth',
};

export default function LayoutRaiz() {
  return (
    <SafeAreaView className="flex-1 bg-transparent">
      <Slot />
    </SafeAreaView>
  );
}
