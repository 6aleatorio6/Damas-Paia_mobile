import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Alert } from 'react-native';
import { useAuth } from '@/libs/apiHooks/auth/tokenContext';
import ButtonBig from '../ButtonBig';
import { useUserDelete } from '@/libs/apiHooks/mutations';

export function UserDelete() {
  const { styles } = useStyles(stylesPaia);

  const { logout } = useAuth();
  const { mutate } = useUserDelete({ onSuccess: logout });

  const confirm = () => {
    Alert.alert('Tem certeza que deseja excluir sua conta?', 'Essa ação é irreversível', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: mutate },
    ]);
  };

  return (
    <ButtonBig style={styles.buttonDelete} onPress={confirm}>
      EXCLUIR CONTA
    </ButtonBig>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  buttonDelete: {
    marginVertical: '10%',
    backgroundColor: theme.colors.bodySec,
    color: theme.colors.danger,
    fontSize: 25,
    height: 55,
    paddingVertical: 10,
  },
}));
