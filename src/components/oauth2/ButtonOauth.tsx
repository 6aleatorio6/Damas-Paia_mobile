import { Alert, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { formatError } from '@/libs/apiHooks/auth/utils';
import { useAxios } from '@/libs/apiHooks/auth/useAxios';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import { router } from 'expo-router';

export interface ButtonOauthProps {
  fetchOAuthToken: () => Promise<string>;
  provider: string;
  children?: React.ReactNode;
}
export default function ButtonOauth({ fetchOAuthToken, provider, children }: ButtonOauthProps) {
  const { styles } = useStyles(stylesPaia);
  const { setToken } = useAuth();
  const axios = useAxios();

  const handleOAuthLogin = async () => {
    try {
      const tokenOrCode = await fetchOAuthToken();
      const { data } = await axios.post(`/oauth2/${provider}`, { tokenOrCode });

      await setToken(data.token);
      router.replace('/(tabs)');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao fazer login', formatError(error as Error));
    }
  };

  return (
    <TouchableOpacity onPress={handleOAuthLogin} style={styles.button}>
      {children}
    </TouchableOpacity>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  button: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: theme.colors.bodyTri,
    borderColor: theme.colors.textSec,
    borderRadius: 5,
    borderWidth: 1,
  },
}));
