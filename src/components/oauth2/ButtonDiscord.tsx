import ButtonOauth from './ButtonOauth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { exchangeCodeAsync, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect, useRef } from 'react';

const redirectUri = makeRedirectUri({ scheme: 'damaspaia', path: 'auth' });
const clientId = process.env.EXPO_PUBLIC_DISCORD_CLIENT_ID || '123123123';
const discovery = {
  authorizationEndpoint: 'https://discord.com/oauth2/authorize',
  tokenEndpoint: 'https://discord.com/api/oauth2/token',
};

export default function ButtonDiscord() {
  const { current } = useRef<{ done?: (t: string) => void; reject?: (e: Error) => void }>({});

  const [req, response, promptAsync] = useAuthRequest(
    { clientId, redirectUri, scopes: ['identify'], responseType: 'code' },
    discovery,
  );

  const handleDiscord = async () => {
    await promptAsync();
    //crio uma promise para esperar o código de autorização do Discord
    const code = await new Promise<string>((resolve, reject) => {
      //armazeno as funções de resolução e rejeição da promise no current para o UseEffect poder acessar
      current.done = resolve;
      current.reject = reject;
    });

    //faço a troca do código de autorização por um token de acesso
    const tokenRes = await exchangeCodeAsync(
      {
        code,
        clientId,
        redirectUri,
        extraParams: { grant_type: 'authorization_code', code_verifier: req!.codeVerifier! },
      },
      discovery,
    );

    return tokenRes.accessToken;
  };

  // Quando a resposta do promptAsync mudar, eu verifico o tipo da resposta e resolvo ou rejeito a promise de handleDiscord
  useEffect(() => {
    if (response?.type === 'error')
      current.reject?.(response.error || new Error('Erro ao autenticar com Discord'));

    if (response?.type === 'cancel' || response?.type === 'dismiss')
      current.reject?.(new Error('Autenticação com Discord cancelada'));

    if (response?.type === 'success') current.done?.(response.params.code);
  }, [response]);

  return (
    <ButtonOauth provider="discord" fetchOAuthToken={handleDiscord}>
      <MaterialIcons name="discord" size={40} color={'#7289DA'} />
    </ButtonOauth>
  );
}
