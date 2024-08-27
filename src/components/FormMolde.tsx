import { PropsWithChildren } from 'react';
import { Text, TextStyle, View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = PropsWithChildren<{ title: string; titleStyle?: TextStyle; style?: ViewProps['style'] }>;
export default function FormMolde(props: Props) {
  const { styles } = useStyles(stylesPaia);

  return (
    <View style={props.style || styles.container}>
      <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
      {props.children}
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    width: '80%',
    marginTop: '9%',
    alignSelf: 'center',
  },
  title: {
    marginBottom: '5%',
    color: theme.colors.textPri,
    fontSize: 29,
    textAlign: 'center',
    fontWeight: 'bold',
  },
}));
