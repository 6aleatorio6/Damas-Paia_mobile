import { Colors } from '@/constants/colors';
import { Fields, useInput } from '@/libs/form/formContext';
import { StatusValidy } from '@/libs/form/useValidador';
import { Text, TextInput, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export function Input(props: { field: Fields }) {
  const { styles } = useStyles(stylesPaia);
  const { setValue, value, ...inputApi } = useInput(props.field);

  const colorsValidy = {
    ERROR: 'danger',
    LOADING: 'bodySec',
    VALIDY: 'textPri',
    OFF: 'bodySec',
  } satisfies Record<string, Colors>;
  const color = colorsValidy[inputApi.status];

  return (
    <View>
      <Text style={styles.field}>{props.field}:</Text>
      <TextInput style={styles.input} value={value} focusable onChangeText={setValue} />
      <Text style={styles.validy(color)}>
        {inputApi.status === 'LOADING' && 'carregando...'}
        {inputApi.status === 'VALIDY' && `${props.field} valido`}
        {inputApi.status === 'ERROR' && inputApi.error}
      </Text>
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  input: {
    width: '100%',
    color: theme.colors.textPri,
    backgroundColor: theme.colors.bodySec,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  field: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    color: theme.colors.textPri,
    textTransform: 'uppercase',
    fontSize: 14,
  },
  validy: (color: Colors) => ({
    paddingHorizontal: 8,
    paddingVertical: 5,
    color: theme.colors[color],
    textTransform: 'uppercase',
    fontSize: 14,
  }),
}));
