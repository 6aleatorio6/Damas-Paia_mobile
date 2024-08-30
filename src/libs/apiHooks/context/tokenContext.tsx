import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { queryClientPaia } from './queryContext';
import { router } from 'expo-router';

interface ITokenContext {
  refresh: () => void;
  token: string | null;
}
const authContext = createContext<ITokenContext | null>(null);

/**
 * Provedor de contexto para gerenciar o token de autenticação
 *
 *  Na primeira renderização, ele volta `false` até que o token seja carregado do asyncStorage. Depois disso, ele renderiza o children se o token existir ou redireciona para a página de login se não.
 *
 */
export function AuthProvider(props: PropsWithChildren) {
  // initial esperar o carregamento inicial do asyncStorage, boolean para a função de refresh
  const [status, setStatus] = useState<'initial' | boolean>('initial');
  const { current } = useRef<ITokenContext>({ refresh: () => setStatus((x) => !x), token: null });

  useEffect(() => {
    (async () => {
      current.token = await AsyncStorage.getItem('token');
      current.refresh();
    })();
  }, []);

  return (
    <authContext.Provider value={current}>{status !== 'initial' && props.children}</authContext.Provider>
  );
}

/**
 * Hook para gerenciar o token de autenticação
 */
export function useAuth() {
  const authState = useContext(authContext);
  if (!authState) throw new Error('useAuth usado fora do AuthProvider');

  return {
    token: authState.token,
    async logout() {
      authState.token = null;
      await AsyncStorage.removeItem('token');
      await queryClientPaia.invalidateQueries();
      authState.refresh();
    },
    async setToken(token: string, rerenderization = true) {
      await AsyncStorage.setItem('token', token);
      authState.token = token;

      if (rerenderization) authState.refresh();
    },
  };
}
