import { Text, Image, View } from 'react-native';
import ButtonBig from '@/components/ButtonBig';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import ButtonGoogle from '@/components/oauth2/ButtonGoogle';
import ButtonFacebook from '@/components/oauth2/ButtonFacebook';
import ButtonDiscord from '@/components/oauth2/ButtonDiscord';

export default function IndexAuth() {
  const { styles, theme } = useStyles(stylesPaia);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/icon.png')} style={theme.styles.image(180, '1/1')} />

      <View style={styles.containerButtons}>
        <Text style={styles.oauthText}>Você pode entrar facilmente com:</Text>
        <View style={styles.oauthButtons}>
          <ButtonGoogle />
          <ButtonFacebook />
          <ButtonDiscord />
        </View>
        <Text style={styles.manualText}>Ou você pode se cadastrar e entrar manualmente:</Text>
        <ButtonBig style={styles.button('primary')} onPress={() => router.navigate('/cadastrar')}>
          CADASTRAR
        </ButtonBig>
        <ButtonBig style={styles.button('secondary')} onPress={() => router.navigate('/entrar')}>
          ENTRAR
        </ButtonBig>
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    width: '100%',
    marginHorizontal: 'auto',
    alignItems: 'center',
    backgroundColor: theme.colors.body,
    justifyContent: 'space-between',
    paddingTop: '5%',
    marginBottom: '14%',
  },
  containerButtons: {
    width: '85%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  oauthText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.textPri,
  },
  manualText: {
    fontSize: 15,
    textAlign: 'center',
    color: theme.colors.textSec,
    marginVertical: 10,
  },
  oauthButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
    gap: 10,
  },
  button: (backColor: Colors) => ({
    color: theme.colors.textPri,
    backgroundColor: theme.colors[backColor],
    fontSize: 30,
    padding: 10,
  }),
}));
