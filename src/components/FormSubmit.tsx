import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig from './ButtonBig';
import { useForm } from '@/libs/form/formHooks';
import { AxiosError } from 'axios';

export default function ButtonSubmit(props: { title: string }) {
  const { styles } = useStyles(stylesPaia);
  const { isFormValidy, mutation, valuesFields } = useForm();

  const isLoading = mutation.isPending && !mutation.isIdle;
  const disabled = !isFormValidy || isLoading;

  let message = (mutation.error as AxiosError<{ message?: string | string[] }>)?.response?.data?.message;
  if (!message) message = mutation.error?.message;
  if (Array.isArray(message)) message = message.join('\n');

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer(disabled)}>
        <ButtonBig disabled={disabled} onPress={() => mutation.mutate(valuesFields)}>
          {isLoading ? 'aguarde...' : props.title}
        </ButtonBig>
      </View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    marginTop: '5%',
    height: '14%',
  },
  text: {
    color: theme.colors.danger,
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 5,
  },
  buttonContainer: (disabled) => ({
    height: '95%',
    opacity: disabled ? 0.4 : 1,
  }),
}));
