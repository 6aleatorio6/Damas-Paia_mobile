import { useEffect, useState } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ModalTemplate from '../ModalTemplate';
import ButtonBig from '../ButtonBig';
import { router } from 'expo-router';
import { queryClientPaia } from '@/libs/apiHooks/reactQuery/queryContext';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';

export default function FailReconnectModal() {
  const { styles } = useStyles(stylesPaia);
  const [modalVisible, setModalVisible] = useState(false);
  const socket = useMatchSocket();

  useEffect(() => {
    const failConnectFunction = () => setModalVisible(true);

    socket.io.on('reconnect_failed', failConnectFunction);
    return () => {
      socket.io.off('reconnect_failed', failConnectFunction);
    };
  }, []);

  return (
    <ModalTemplate
      modalVisible={modalVisible}
      onRequestClose={() => null}
      title="Conexão perdida. Não foi possível se reconectar ao servidor."
    >
      <ButtonBig
        onPress={() => {
          router.replace('/(tabs)/(user)');
          queryClientPaia.refetchQueries({ queryKey: ['healthcheck'] }, { cancelRefetch: false }); // check if the server is down and open the modal again
        }}
        style={styles.button('exit')}
      >
        Voltar ao menu
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
    marginHorizontal: 5,
    alignItems: 'center',
    fontSize: type === 'exit' ? 20 : 16,
    fontWeight: 'bold',
  }),
  buttonText: {
    color: theme.colors.textPri,
    fontWeight: 'bold',
  },
}));
