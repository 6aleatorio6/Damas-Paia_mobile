import { useAuth } from '@/libs/mutationOrQuery/authToken';
import { Redirect, SplashScreen, Tabs } from 'expo-router';
import { useEffect } from 'react';

export default function TabsLayout() {
  const { token } = useAuth();

  useEffect(() => {
    if (token !== undefined) SplashScreen.hideAsync();
  }, [token]);

  if (token === undefined) return null;

  if (!token) return <Redirect href="(auth)" />;

  return <Tabs />;
}
