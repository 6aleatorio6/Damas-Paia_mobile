import { Colors } from '@/constants/colors';
import { Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface Props {
  children: string;
  fontSize?: number;
  backgroundColor: Colors;
  color: Colors;
  height?: number;
  onPress?: () => void;
}
export default function ButtonBig({ onPress, children, fontSize, backgroundColor, color, height }: Props) {
  const { button, text } = useStyles(stylesPaia).styles;

  return (
    <TouchableOpacity style={button(backgroundColor, height || 40)} onPress={onPress}>
      <Text style={text(fontSize, color)}>{children}</Text>
    </TouchableOpacity>
  );
}

const stylesPaia = createStyleSheet((theme, info) => ({
  button: (color: Colors, height: number) => ({
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors[color],
    minHeight: height,
    borderRadius: 10,
  }),
  text: (size = 27, color: Colors) => ({
    color: theme.colors[color],
    textAlign: 'center',
    fontSize: size,
    fontWeight: 'bold',
  }),
}));
