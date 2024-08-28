import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonSubmit from '@/components/ButtonSubmit';
import useApi from '@/libs/apiHooks/useApi';
import { Alert } from 'react-native';
import { useAuth } from '@/libs/apiHooks/authToken';
import { queryClientPaia } from '@/app/_layout';

export function UserDelete() {
  const { logout } = useAuth();
  const { styles } = useStyles(stylesPaia);

  const mutation = useApi('mutate', (axios) => ({
    mutationFn: async () => {
      Alert.alert('Tem certeza que deseja excluir sua conta?', 'Essa ação é irreversível', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            await axios.delete('/user');
            await logout();
            await queryClientPaia.invalidateQueries();
          },
        },
      ]);
    },
  }));

  return <ButtonSubmit style={styles.buttonDelete} title="EXCLUIR CONTA" mutation={mutation} />;
}

const stylesPaia = createStyleSheet((theme) => ({
  buttonDelete: {
    marginVertical: '10%',
    backgroundColor: theme.colors.bodySec,
    color: theme.colors.danger,
    fontSize: 30,
    height: 60,
    paddingVertical: 10,
  },
}));
