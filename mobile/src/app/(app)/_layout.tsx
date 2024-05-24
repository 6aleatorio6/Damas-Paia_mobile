import { storeAuth } from '@/lib/logicAuth';
import { Redirect, Tabs } from 'expo-router';

export default function LayoutHome() {
  const token = storeAuth((s) => s.token);

  if (!token) return <Redirect href={'/(auth)/index'} />;

  return <Tabs />;
}
