import { Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function ButtonBig(props: Omit<TouchableOpacityProps, 'style'> & { style?: IButtonStyle }) {
  const { styles } = useStyles(stylesPaia);
  const { style = {}, children, ...propsButton } = props;

  return (
    <TouchableOpacity style={styles.button(style)} {...propsButton}>
      <Text style={styles.text(style)}>{children}</Text>
    </TouchableOpacity>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  button: ({ color, fontSize, ...styleButton }: IButtonStyle) => ({
    backgroundColor: colors.primary,
    justifyContent: 'center',
    borderRadius: 10,
    ...styleButton,
  }),
  text: ({ color = colors.textPri, fontSize = 40 }: IButtonStyle) => ({
    color,
    fontSize,
    textAlign: 'center',
    fontWeight: 'bold',
  }),
}));

export interface IButtonStyle extends Omit<ViewStyle, 'overflow' | 'transform'> {
  color?: string;
  fontSize?: number;
}
