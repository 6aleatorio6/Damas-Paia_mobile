import ButtonBig from '@/components/ButtonBig';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Copyright from '@/components/Copyright';
import { router } from 'expo-router';

export default function IndexAuth() {
  const { styles, theme } = useStyles(stylesPaia);

  return (
    <>
      <View style={styles.container}>
        <Image source={require('@/assets/icon.png')} style={theme.styles.image(180, '1/1')} />
        <View style={styles.buttons}>
          <ButtonBig backgroundColor="primary" color="textPri" onPress={() => router.navigate('/cadastrar')}>
            CADASTRAR
          </ButtonBig>
          <ButtonBig backgroundColor="secondary" color="textPri">
            ENTRAR
          </ButtonBig>
        </View>
      </View>
      <Copyright />
    </>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.body,
    justifyContent: 'space-around',
    paddingTop: '5%',
  },
  buttons: {
    flexDirection: 'column',
    width: '80%',
    gap: 17,
    height: '30%',
  },
}));
