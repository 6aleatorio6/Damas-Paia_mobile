import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { queryClientPaia } from '../reactQuery/queryContext';

interface ITokenContext {
  refresh: () => void;
  tokenRef: { val: string | null };
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
  const { current } = useRef<ITokenContext['tokenRef']>({ val: null });

  useEffect(() => {
    (async () => {
      current.val = await AsyncStorage.getItem('token');
      setStatus(!status);
    })();
  }, []);

  return (
    <authContext.Provider value={{ refresh: () => setStatus((x) => !x), tokenRef: current }}>
      {status !== 'initial' && props.children}
    </authContext.Provider>
  );
}

/**
 * Hook para gerenciar o token de autenticação
 */
export function useAuth() {
  const authState = useContext(authContext);
  if (!authState) throw new Error('useAuth usado fora do AuthProvider');
  const { refresh, tokenRef } = authState;

  return {
    token: authState.tokenRef.val,
    async logout() {
      tokenRef.val = null;
      await AsyncStorage.removeItem('token');
      queryClientPaia.clear();
      refresh();
    },
    async setToken(token: string, rerenderization = true) {
      await AsyncStorage.setItem('token', token);
      tokenRef.val = token;

      if (rerenderization) authState.refresh();
    },
  };
}
