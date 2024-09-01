import { Colors } from '@/constants/colors';
import { UseFormR, useInput } from '@/libs/form/formHooks';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface Props<F extends string> extends TextInputProps {
  form: UseFormR<F>;
  field: F;
  name?: string;
}
export default function Input<F extends string>({ form, name, field, defaultValue, ...props }: Props<F>) {
  const { styles, theme } = useStyles(stylesPaia);
  const { setValue, value, ...valid } = useInput(form, field, defaultValue);

  const statusEnum = {
    LOADING: ['warning', 'carregando...'],
    VALIDY: ['success', `${name || field} valido`],
    ERROR: ['danger', valid.error],
    OFF: ['bodySec', ''],
  } as const;

  const [color, mensagem] = statusEnum[valid.status];

  return (
    <View>
      <Text style={styles.field}>{name || field}:</Text>
      <TextInput
        placeholder={name || field}
        placeholderTextColor={theme.colors.textSec}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        {...props}
      />
      <Text style={styles.validy(color)}>{mensagem}</Text>
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
  validy: (color: Colors) => {
    return {
      paddingHorizontal: 8,
      paddingVertical: 2,
      color: theme.colors[color],
      textTransform: 'lowercase',
      fontSize: 14,
    };
  },
}));
