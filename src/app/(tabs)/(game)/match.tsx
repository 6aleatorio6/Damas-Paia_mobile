import ButtonBig from '@/components/ButtonBig';
import AlertError from '@/components/game/AlertError';
import Board from '@/components/game/Board';
import EndModal from '@/components/game/EndModal';
import ExitModal from '@/components/game/ExitModal';
import FailReconnectModal from '@/components/game/FailReconnectInGameModal';
import Pieces from '@/components/game/Pieces';
import PlayerHud from '@/components/game/PlayerHud';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import React from 'react';
import { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Match() {
  const squareSizeState = useState(0);
  const { styles } = useStyles(stylesPaia);
  const socket = useMatchSocket();

  useEffect(() => {
    const e = BackHandler.addEventListener('hardwareBackPress', () => {
      socket.data.openModalExit(true);
      return true;
    });

    return e.remove;
  }, []);

  return (
    <>
      <ExitModal />
      <FailReconnectModal />
      <EndModal />
      <View style={styles.container}>
        <View style={styles.CBoard}>
          <PlayerHud />
          <Board useSquareSize={squareSizeState}>
            <Pieces squareSize={squareSizeState[0]} />
          </Board>
          <PlayerHud isUser />
        </View>
        <ButtonBig onPress={() => socket.data.openModalExit(true)} style={styles.button}>
          DESISTIR
        </ButtonBig>
        <AlertError />
      </View>
    </>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  container: {
    width: '90%',
    height: '95%',
    alignSelf: 'center',
  },
  CBoard: {
    width: '100%',
    marginTop: '10%',
  },
  button: {
    fontSize: 18,
    padding: 14,
    margin: 'auto',
    color: colors.warning,
    backgroundColor: colors.bodySec,
    borderColor: colors.danger,
    borderWidth: 1,
  },
}));
