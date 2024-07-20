import { Image, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function HeaderLogo() {
  const { styles } = useStyles(stylesPaia);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>DAMAS</Text>
      <View style={styles.subContainer}>
        <Image source={require('@/assets/icon.png')} style={styles.logo('left')} />
        <Text style={styles.text}>PAIA</Text>
        <Image source={require('@/assets/icon.png')} style={styles.logo('right')} />
      </View>
    </View>
  );
}

const sizeAll = 1.1;

const stylesPaia = createStyleSheet((theme) => ({
  container: { alignItems: 'center' },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: (lado: 'right' | 'left', size = 48 * sizeAll) => ({
    height: size,
    width: size,
    bottom: -3 * sizeAll,
    [lado]: 0 * sizeAll,
  }),
  text: {
    color: theme.colors.textPri,
    fontSize: 68 * sizeAll,
    marginEnd: 3 * sizeAll,
    textAlign: 'center',
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
}));
