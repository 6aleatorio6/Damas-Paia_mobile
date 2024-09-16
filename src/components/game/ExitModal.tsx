import React, { useState } from 'react';
import { Modal, View, Text } from 'react-native';
import ButtonBig from '../ButtonBig';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';

export default function ExitModal() {
  const { styles } = useStyles(stylesPaia);
  const [visible, setVisible] = useState(false);

  const socket = useMatchSocket();
  socket.data.openModalExit = setVisible;

  const onCancel = () => {
    setVisible(false);
  };

  const onConfirm = async () => {
    socket.emit('match:quit');
    setVisible(false);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Confirmar Saída</Text>
          <Text style={styles.message}>Você realmente deseja abandonar a partida?</Text>
          <View style={styles.buttonContainer}>
            <ButtonBig style={styles.button('voltar')} onPress={onCancel}>
              VOLTAR
            </ButtonBig>
            <ButtonBig style={styles.button('exit')} onPress={onConfirm}>
              ABANDONAR
            </ButtonBig>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: colors.body,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.textPri,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.textSec,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: (mode: 'exit' | 'voltar') => ({
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    backgroundColor: mode === 'exit' ? colors.bodySec : colors.success,
    borderRadius: 5,
    alignItems: 'center',
    color: mode === 'exit' ? colors.danger : colors.textPri,
    fontSize: 15,
  }),
}));
