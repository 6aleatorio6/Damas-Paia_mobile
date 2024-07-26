import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Indextabs() {
  const { text } = useStyles(stylesheet).styles;

  return <Text style={text}>ola</Text>;
}

const stylesheet = createStyleSheet((theme) => ({
  text: {
    color: theme.colors.body,
  },
}));
