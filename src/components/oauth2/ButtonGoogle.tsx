import { GoogleSignin } from '@react-native-google-signin/google-signin';
import ButtonOauth from './ButtonOauth';
import { Image } from 'expo-image';

// https://peerlist.io/blog/engineering/implementing-google-signin-in-react-native#8-implement-user-sessions

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  scopes: ['profile'],
});

const GoogleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  return userInfo;
};

export default function ButtonGoogle() {
  const handleGoogle = async () => {
    const { data, type } = await GoogleLogin();
    if (type === 'cancelled') throw new Error('Login cancelado');
    if (!data.idToken) throw new Error('Não foi possível fazer login com o Google');

    return data.idToken;
  };

  return (
    <ButtonOauth provider="google" fetchOAuthToken={handleGoogle}>
      <Image source={require('@/assets/google-logo.png')} style={{ aspectRatio: 1, height: '100%' }} />
    </ButtonOauth>
  );
}
