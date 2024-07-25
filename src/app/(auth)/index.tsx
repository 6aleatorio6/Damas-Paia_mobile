import ButtonBig, { IButtonStyle } from '@/components/ButtonBig';
import { Image, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import Copyright from '@/components/Copyright';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function IndexAuth() {
  const { styles, theme } = useStyles(stylesPaia);

  return (
    <>
      <View style={styles.container}>
        <Image source={require('@/assets/icon.png')} style={theme.styles.image(180, '1/1')} />
        <View style={styles.buttons}>
          <ButtonBig style={styles.button('primary')} onPress={() => router.navigate('/cadastrar')}>
            CADASTRAR
          </ButtonBig>
          <ButtonBig style={styles.button('secondary')} onPress={() => router.navigate('/entrar')}>
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
    justifyContent: 'space-between',
    width: '80%',
    height: '28%',
  },
  button: (backColor: Colors) =>
    ({
      color: theme.colors.textPri,
      backgroundColor: theme.colors[backColor],
      height: '44%',
    }) satisfies IButtonStyle,
}));
