import { useHealthcheck } from '@/libs/apiHooks/querys';
import { useState, useEffect } from 'react';
import { BackHandler, ActivityIndicator } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig from './ButtonBig';
import { queryClientPaia } from '@/libs/apiHooks/reactQuery/queryContext';
import ModalTemplate from './ModalTemplate';

export default function Healthcheck() {
  const check = useHealthcheck({});
  const [modalVisible, setModalVisible] = useState(false);
  const { styles, theme } = useStyles(stylesPaia);

  useEffect(() => {
    if (check.error) setModalVisible(true);
    if (check.isSuccess) {
      queryClientPaia.refetchQueries();
      queryClientPaia.resumePausedMutations();
      setModalVisible(false);
    }
  }, [check.error, check.isSuccess]);

  const handleRetry = () => check.refetch();
  const handleExit = () => BackHandler.exitApp();

  return (
    <ModalTemplate
      modalVisible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      title="Sem conexão"
      subtitle="Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente."
    >
      <ButtonBig onPress={handleRetry} style={styles.button('retry')}>
        {check.isFetching && <ActivityIndicator size={'large'} color={theme.colors.textPri} />}
        {!check.isFetching && 'Tentar Novamente'}
      </ButtonBig>
      <ButtonBig onPress={handleExit} style={styles.button('exit')}>
        SAIR
      </ButtonBig>
    </ModalTemplate>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  button: (type: 'exit' | 'retry') => ({
    flex: 1,
    backgroundColor: theme.colors[type === 'exit' ? 'danger' : 'primary'],
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    fontSize: type === 'exit' ? 20 : 16,
    fontWeight: 'bold',
  }),
  buttonText: {
    color: theme.colors.textPri,
    fontWeight: 'bold',
  },
}));
