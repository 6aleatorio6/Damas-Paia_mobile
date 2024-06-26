import { Colors } from '@/constants/colors';
import { Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface Props {
  children: string;
  fontSize?: number;
  backgroundColor: Colors;
  color: Colors;
  onPress?: () => any;
}
export default function ButtonBig({ onPress, children, fontSize, backgroundColor, color }: Props) {
  const { button, text } = useStyles(stylesPaia).styles;

  return (
    <TouchableOpacity style={button(backgroundColor)} onPress={onPress}>
      <Text style={text(fontSize, color)}>{children}</Text>
    </TouchableOpacity>
  );
}

const stylesPaia = createStyleSheet((theme, info) => ({
  button: (color: Colors) => ({
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors[color],
    borderRadius: 10,
  }),
  text: (size = 27, color: Colors) => ({
    color: theme.colors[color],
    textAlign: 'center',
    fontSize: size,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  }),
}));
