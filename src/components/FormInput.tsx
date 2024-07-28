import { Colors } from '@/constants/colors';
import { Fields } from '@/libs/form/formContext';
import { useInput } from '@/libs/form/formHooks';
import { StatusValidy } from '@/libs/form/useValidador';
import { useEffect } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface Props extends TextInputProps {
  field: Fields;
  name?: string;
}
export default function Input({ name, field, defaultValue, ...props }: Props) {
  const { styles, theme } = useStyles(stylesPaia);
  const { setValue, value, ...inpuContext } = useInput(field);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, []);

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
      <Text style={styles.validy(inpuContext.status)}>
        {inpuContext.status === 'LOADING' && 'carregando...'}
        {inpuContext.status === 'VALIDY' && `${name || field} valido`}
        {inpuContext.status === 'ERROR' && inpuContext.error}
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
  validy: (status: StatusValidy) => {
    const statusColor: Record<StatusValidy, Colors> = {
      ERROR: 'danger',
      LOADING: 'warning',
      VALIDY: 'success',
      OFF: 'bodySec',
    };

    return {
      paddingHorizontal: 8,
      paddingVertical: 2,
      color: theme.colors[statusColor[status]],
      textTransform: 'lowercase',
      fontSize: 14,
    };
  },
}));
