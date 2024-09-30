import ButtonBig from '@/components/ButtonBig';
import { queryClientPaia } from '@/libs/apiHooks/reactQuery/queryContext';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Parear() {
  const { styles } = useStyles(stylePaia);
  const [modalVisible, setModalVisible] = useState(true);
  const socket = useMatchSocket();

  const closeModal = () => {
    setModalVisible(false);
    router.back();
  };

  // adiciona um evento que é disparado quando falha em se reconectar ao servidor, a tela match tem um evento parecido
  useEffect(() => {
    const failConnectFunction = () => {
      // volta para a tela de menu
      closeModal();
      // faz uma query para verificar se o servidor está online, se não estiver, abre o modal de healthcheck
      queryClientPaia.refetchQueries({ queryKey: ['healthcheck'] }, { cancelRefetch: false }); // check if the server is down and open the modal again
    };

    socket.io.on('reconnect_failed', failConnectFunction);
    return () => {
      socket.io.off('reconnect_failed', failConnectFunction);
    };
  }, []);

  useEffect(() => {
    const cb = (error: Error) => {
      closeModal();
      alert(`${error.message}`);
    };

    socket.on('error', cb);
    return () => {
      socket.off('error', cb);
    };
  }, []);

  useEffect(() => {
    socket.emit('match:queue', 'join');
    socket.on('match:init', (match, pieces, myPlayer) => {
      socket.data.matchInit = match;
      socket.data.myPlayer = myPlayer;
      socket.data.opPlayer = myPlayer === 'player1' ? 'player2' : 'player1';
      socket.data.piecesInit = pieces;
      setModalVisible(false);
      router.replace('/(game)/match');
    });

    return () => {
      socket.emit('match:queue', 'leave');
      socket.off('error');
      socket.off('match:init');
    };
  }, []);

  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>PAREANDO</Text>
          <Image style={styles.gif} source={require('@/assets/xadrezRodando.gif')} />
          <Text style={styles.modalText}>Aguarde enquanto procuramos outro jogador...</Text>
          <ButtonBig style={styles.button} onPress={closeModal}>
            CANCELAR
          </ButtonBig>
        </View>
      </View>
    </Modal>
  );
}

const stylePaia = createStyleSheet((theme, info) => ({
  title: {
    color: theme.colors.textPri,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    position: 'absolute',
  },
  gif: {
    width: 200,
    height: 180,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: theme.colors.bodySec,
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    borderColor: theme.colors.secondary,
    borderWidth: 2,
  },
  button: {
    marginTop: 20,
    padding: 10,
    elevation: 2,
    height: 50,
    fontSize: 20,
    width: '100%',
    color: theme.colors.warning,
    backgroundColor: theme.colors.secondary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.textSec,
  },
}));
