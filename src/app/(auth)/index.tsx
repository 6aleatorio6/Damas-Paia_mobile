import HeaderLogo from '@/components/HeaderLogo';
import ButtonBig from '@/components/ButtonBig';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function IndexAuth() {
  const {
    styles,
    theme: { styles: styleTheme },
  } = useStyles(stylesPaia);

  return (
    <View style={styles.container}>
      <HeaderLogo />
      <Image source={require('@/assets/icon.png')} style={styleTheme.image('25%', '1/1')} />
      <View style={styles.buttons}>
        <ButtonBig backgroundColor="primary" color="textPri">
          CADASTRAR
        </ButtonBig>
        <ButtonBig backgroundColor="secondary" color="textPri">
          ENTRAR
        </ButtonBig>
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.body,
    justifyContent: 'space-between',
    paddingBottom: '10%',
  },
  buttons: {
    flexDirection: 'column',
    width: '80%',
    gap: 17,
    height: '20%',
  },
}));
