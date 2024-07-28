import { FormProvider, FormProviderProps } from '@/libs/form/formContext';
import { Text, TextStyle, View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function FormMolde(
  props: FormProviderProps & { title: string; style?: ViewProps['style']; titleStyle?: TextStyle },
) {
  const { styles } = useStyles(stylesPaia);

  return (
    <FormProvider submitOptions={props.submitOptions} replaceValids={props.replaceValids}>
      <View style={props.style || styles.container}>
        <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        {props.children}
      </View>
    </FormProvider>
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
