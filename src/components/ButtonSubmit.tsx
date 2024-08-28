/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig, { IButtonStyle } from './ButtonBig';
import { UseMutationResult } from '@tanstack/react-query';
import { formatError } from '@/libs/apiHooks/formatError';

export interface ButtonSubmitProps {
  title: string;
  height?: number | string;
  style?: IButtonStyle;
  disabled?: boolean;
  mutation: UseMutationResult;
  mutateData?: any;
}

export default function ButtonSubmit(props: ButtonSubmitProps) {
  const { styles } = useStyles(stylesPaia);
  const { isPending, isIdle, error, mutate } = props.mutation;

  const isLoading = isPending && !isIdle;
  const disabled = props.disabled || isLoading;
  const styleButton = { ...(props.style || {}), ...styles.buttonContainer(disabled) };

  return (
    <View style={styles.container(props.height)}>
      <ButtonBig style={styleButton} disabled={disabled} onPress={() => mutate(props.mutateData)}>
        {isLoading ? 'aguarde...' : props.title}
      </ButtonBig>
      {error && <Text style={styles.text}>{formatError(error)}</Text>}
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: (height: any = '14%') => ({
    marginTop: '5%',
    height,
  }),
  text: {
    color: theme.colors.danger,
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 5,
  },
  buttonContainer: (disabled) => ({
    opacity: disabled ? 0.4 : 1,
    padding: '3%',
  }),
}));
