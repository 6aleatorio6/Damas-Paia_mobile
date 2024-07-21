import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/src/types';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { ArrowLeftCircle } from 'lucide-react-native';

const sizeAll = 1.1;

export default function HeaderAuth(props: NativeStackHeaderProps) {
  const { styles, theme } = useStyles(stylesPaia);

  const isBack = props.back && props.navigation.canGoBack();
  return (
    <View style={styles.container}>
      {isBack && (
        <TouchableOpacity style={styles.buttonBack} onPress={props.navigation.goBack}>
          <ArrowLeftCircle size={36} color={theme.colors.textPri} />
        </TouchableOpacity>
      )}
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
    padding: 15,
    margin: 0,
    color: theme.colors.textPri,
  },
}));
