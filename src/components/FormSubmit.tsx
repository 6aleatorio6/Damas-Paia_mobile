import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig from './ButtonBig';
import { useForm } from '@/libs/form/formHooks';

export default function ButtonSubmit(props: { title: string }) {
  const { styles } = useStyles(stylesPaia);
  const { isFormValidy, mutation } = useForm();

  const isLoading = mutation.isPending && !mutation.isIdle;
  const disabled = !isFormValidy || isLoading;

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer(disabled)}>
        <ButtonBig disabled={disabled} onPress={() => mutation.mutate}>
          {isLoading ? 'aguarde...' : props.title}
        </ButtonBig>
      </View>
      <Text style={styles.text}>{mutation.error?.message}</Text>
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
