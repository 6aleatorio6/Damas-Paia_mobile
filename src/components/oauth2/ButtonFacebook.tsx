import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import ButtonOauth from './ButtonOauth';
import { Image } from 'expo-image';
import Entypo from '@expo/vector-icons/Entypo';

export default function ButtonFacebook() {
  const handleFacebook = async () => {
    const { isCancelled } = await LoginManager.logInWithPermissions(['public_profile']);
    if (isCancelled) throw new Error('Login cancelado');

    const result = await AccessToken.getCurrentAccessToken();
    if (!result) throw new Error('Não foi possível fazer login com o Facebook');

    return result.accessToken;
  };

  return (
    <ButtonOauth provider="facebook" fetchOAuthToken={handleFacebook}>
      {/* <Image source={require('@/assets/facebook-logo.png')} style={{ aspectRatio: 1, height: '100%' }} /> */}
      <Entypo name="facebook" size={37.5} color="#3391bc" />
    </ButtonOauth>
  );
}
