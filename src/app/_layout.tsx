import 'unistyles';
import { Slot } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)/index',
};

export default function LayoutRaiz() {
  return <Slot initialRouteName="(tabs)" />;
}
