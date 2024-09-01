import { Image, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ButtonLeftHeader } from './ButtonLeftHeader';

const sizeAll = 1.1;

export default function HeaderAuth() {
  const { styles } = useStyles(stylesPaia);

  return (
    <View style={styles.container}>
      <ButtonLeftHeader />
      <Text style={styles.text}>DAMAS</Text>
      <View style={styles.subContainer}>
        <Image source={require('@/assets/icon.png')} style={styles.logo} />
        <Text style={styles.text}>PAIA</Text>
        <Image source={require('@/assets/icon.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: theme.colors.body,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 48 * sizeAll,
    width: 48 * sizeAll,
    bottom: -3 * sizeAll,
  },
  text: {
    color: theme.colors.textPri,
    fontSize: 68 * sizeAll,
    marginEnd: 3 * sizeAll,
    textAlign: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  buttonBack: {
    position: 'absolute',
    start: 0,
    padding: 25,
    margin: 0,
    color: theme.colors.textPri,
  },
}));
