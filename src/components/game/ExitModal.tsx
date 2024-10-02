import React, { useState } from 'react';
import ButtonBig from '../ButtonBig';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import ModalTemplate from '../ModalTemplate';

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
    <ModalTemplate
      modalVisible={visible}
      onRequestClose={onCancel}
      title="Desistir da partida"
      subtitle="Você realmente deseja desistir da partida?"
    >
      <ButtonBig style={styles.button('voltar')} onPress={onCancel}>
        VOLTAR
      </ButtonBig>
      <ButtonBig style={styles.button('exit')} onPress={onConfirm}>
        DESISTIR
      </ButtonBig>
    </ModalTemplate>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  button: (mode: 'exit' | 'voltar') => ({
    flex: 1,
    padding: 10,
    textAlign: 'center',
    backgroundColor: mode === 'exit' ? colors.bodySec : colors.success,
    borderRadius: 5,
    alignItems: 'center',
    color: mode === 'exit' ? colors.danger : colors.textPri,
    fontSize: 15,
  }),
}));
