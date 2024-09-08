/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivityIndicator, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig, { IButtonStyle } from './ButtonBig';
import { UseMutationResult } from '@tanstack/react-query';
import { formatError } from '@/libs/apiHooks/auth/formatError';

export interface ButtonSubmitProps<D = unknown> {
  title: string;
  height?: number | string;
  style?: IButtonStyle;
  disabled?: boolean;
  mutation: UseMutationResult<unknown, Error, D>;
  mutateData: D;
}

export default function ButtonSubmit<D>(props: ButtonSubmitProps<D>) {
  const { styles, theme } = useStyles(stylesPaia);
  const { isPending, isIdle, error, mutate } = props.mutation;

  const isLoading = isPending && !isIdle;
  const disabled = props.disabled || isLoading;
  const styleButton = { ...(props.style || {}), ...styles.buttonContainer(disabled) };

  return (
    <View style={styles.container(props.height)}>
      <ButtonBig
        accessibilityRole="button"
        style={styleButton}
        disabled={disabled}
        onPress={() => mutate(props.mutateData)}
      >
        {isLoading ? <ActivityIndicator size={'large'} color={theme.colors.textPri} /> : props.title}
      </ButtonBig>
      {error && (
        <Text accessibilityLabel="error" style={styles.text}>
          {formatError(error)}
        </Text>
      )}
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
