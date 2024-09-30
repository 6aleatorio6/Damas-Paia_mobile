/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import { useAuth } from '../auth/tokenContext';
import { baseURL, refreshTokenOrLogout } from '../auth/utils';

type SocketPaia = Socket<ServerToCl, ClientToSv> & { data: MatchSocketData };
const SocketContext = createContext<SocketPaia | null>(null);

export function MatchSocketProvider(props: PropsWithChildren) {
  const auth = useAuth();

  const client = useMemo(() => {
    const socket = io(`${baseURL}/match`, {
      autoConnect: false,
      extraHeaders: { Authorization: `Bearer ${auth.token}` },
      reconnectionAttempts: Number(process.env.EXPO_PUBLIC_SOCKET_RECONNECTION_MAX_SECONDS) || 5,
      reconnectionDelayMax: 1000, // Tempo máximo entre tentativas de reconexão
      reconnectionDelay: 1000, // Tempo base entre tentativas de reconexão
    }) as SocketPaia;
    socket.data = {} as any;
    return socket;
  }, []);

  useEffect(() => {
    client.connect();

    const cbConnectError = async (e: any) => {
      try {
        // se disparar algum erro, quer dizer que não recebeu a mensagem que sinaliza que o token é inválido
        const { message } = JSON.parse(e?.context?.responseText);

        if (message === 'valid') throw e;
        // Se o erro for de token expirado, tenta fazer o refresh do token
        const tokenNovo = await refreshTokenOrLogout(auth);
        client.io.opts.extraHeaders = { Authorization: `Bearer ${tokenNovo}` };
        client.disconnect().connect();
      } catch {
        console.log('Erro ao conectar com o socket:', e);
      }
    };

    client.on('connect_error', cbConnectError);

    client.on('error', console.log);

    return () => {
      client.disconnect();
      client.off('connect_error', cbConnectError);
      client.off('error', console.log);
    };
  }, []);

  return <SocketContext.Provider value={client}>{props.children}</SocketContext.Provider>;
}

export function useMatchSocket() {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error('useSocket usado fora do SocketProvider');
  return socket;
}
