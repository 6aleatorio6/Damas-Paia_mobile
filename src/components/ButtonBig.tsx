import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
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
  button: ({ backgroundColor = colors.primary, height = '100%' }: IButtonStyle) => ({
    backgroundColor,
    height,
    justifyContent: 'center',
    borderRadius: 10,
  }),
  text: ({ color = colors.textPri, fontSize = 40 }: IButtonStyle) => ({
    color,
    fontSize,
    textAlign: 'center',
    fontWeight: 'bold',
  }),
}));

export interface IButtonStyle {
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  height?: number | `${number}%`;
}
