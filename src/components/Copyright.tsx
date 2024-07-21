import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Copyright() {
  const { styles } = useStyles(stylesPaia);

  return <Text style={styles.text}>Criado por 6aleatorio6(Leonardo)</Text>;
}

const stylesPaia = createStyleSheet((theme) => ({
  text: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 9,
    color: theme.colors.textPri,
    fontWeight: 'light',
  },
}));
