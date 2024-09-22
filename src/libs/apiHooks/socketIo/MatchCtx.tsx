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
    }) as SocketPaia;
    socket.data = {} as any;
    return socket;
  }, []);

  useEffect(() => {
    client.connect();

    client.on('connect_error', async (e: any) => {
      try {
        // se disparar algum erro, quer dizer que não recebeu a mensagem que sinaliza que o token é inválido
        const { message } = JSON.parse(e?.context?.responseText);

        if (message === 'valid') throw e;
        // Se o erro for de token expirado, tenta fazer o refresh do token
        const tokenNovo = await refreshTokenOrLogout(auth);
        client.io.opts.extraHeaders = { Authorization: `Bearer ${tokenNovo}` };
        client.disconnect().connect();
      } catch {
        console.log('Erro ao conectar com o socket', e);
      }
    });

    client.on('error', console.log);

    return () => {
      client.disconnect();
      client.off('connect_error');
      client.off('error');
    };
  }, []);

  return <SocketContext.Provider value={client}>{props.children}</SocketContext.Provider>;
}

export function useMatchSocket() {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error('useSocket usado fora do SocketProvider');
  return socket;
}
