import { useAuth } from '@/libs/mutationOrQuery/authToken';
import { Redirect, Tabs } from 'expo-router';

export default function TabsLayout() {
  const { token } = useAuth();

  if (!token) return <Redirect href="(auth)" />;

  return <Tabs />;
}
