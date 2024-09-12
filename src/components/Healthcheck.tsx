import { useHealthcheck } from '@/libs/apiHooks/querys';
import { useState, useEffect } from 'react';
import { View, Text, Modal, BackHandler, ActivityIndicator } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import ButtonBig from './ButtonBig';
import { queryClientPaia } from '@/libs/apiHooks/reactQuery/queryContext';

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

  const handleRetry = () => {
    check.refetch();
  };
  const handleExit = () => BackHandler.exitApp();

  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleExit}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.
          </Text>
          <View style={styles.buttonContainer}>
            <ButtonBig onPress={handleRetry} style={styles.button('retry')}>
              {check.isFetching && <ActivityIndicator size={'large'} color={theme.colors.textPri} />}
              {!check.isFetching && 'Tentar Novamente'}
            </ButtonBig>
            <ButtonBig onPress={handleExit} style={styles.button('exit')}>
              SAIR
            </ButtonBig>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    width: '80%',
    backgroundColor: theme.colors.body,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPri,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
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
