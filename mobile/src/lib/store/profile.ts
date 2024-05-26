import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Auth {
  token: null | string;
  theme: 'dark' | 'light';

  setTheme: (theme: 'dark' | 'light') => void;

  login: (token: string) => void;

  logout: () => void;
}

/**
 * Armazena informações de autenticação do usuário, como o token de autenticação e o tema do aplicativo.
 */
export const storeProfile = create<Auth>()(
  persist(
    (set, get) => ({
      token: null,
      theme: 'dark',

      setTheme(theme) {
        set(() => ({ theme }));
      },

      login(token: string) {
        set(() => ({ token: token }));
        router.replace('/(app)');
      },

      logout() {
        set(() => ({ token: null }));
      },
    }),
    {
      name: 'authPaia',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
