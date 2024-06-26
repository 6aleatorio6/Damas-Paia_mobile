import { Redirect, Tabs } from 'expo-router';

export default function TabsLayout() {
  const isLogged = false;

  if (!isLogged) return <Redirect href="(auth)" />;

  return <Tabs />;
}
