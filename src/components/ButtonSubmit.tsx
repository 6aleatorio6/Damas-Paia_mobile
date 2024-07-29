/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig, { IButtonStyle } from './ButtonBig';
import { AxiosError } from 'axios';
import useApi, { CbAxios } from '@/libs/apiHooks/useApi';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

export interface ButtonSubmitProps {
  title: string;
  height?: number | string;
  style?: IButtonStyle;
  disabled?: boolean;
  useApi: CbAxios<UseMutationOptions<any, any, any, any>> | UseMutationResult<any, any, any, any>;
  mutateData?: any;
}
export default function ButtonSubmit(props: ButtonSubmitProps) {
  const { styles } = useStyles(stylesPaia);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resultApi = typeof props.useApi === 'object' ? props.useApi : useApi('mutate', props.useApi);
  const { isPending, isIdle, error, mutate } = resultApi;

  const isLoading = isPending && !isIdle;
  const disabled = props.disabled || isLoading;

  let message = (error as AxiosError<{ message?: string | string[] }>)?.response?.data?.message;
  if (!message) message = error?.message;
  if (Array.isArray(message)) message = message.join('\n');

  return (
    <View style={styles.container(props.height)}>
      <ButtonBig
        style={{ ...(props.style || {}), ...styles.buttonContainer(disabled) }}
        disabled={disabled}
        onPress={() => mutate(props.mutateData)}
      >
        {isLoading ? 'aguarde...' : props.title}
      </ButtonBig>
      <Text style={styles.text}>{message}</Text>
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
