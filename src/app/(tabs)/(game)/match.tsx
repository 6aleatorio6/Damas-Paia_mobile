import Board from '@/components/game/Board';
import Pieces from '@/components/game/Pieces';
import PlayerHud from '@/components/game/PlayerHud';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';

export default function Match() {
  const squareSizeState = useState(0);
  const socket = useMatchSocket();

  useEffect(() => {
    const e = BackHandler.addEventListener('hardwareBackPress', () => {
      socket.data.openModalExit(true);
      return true;
    });

    return e.remove;
  }, []);

  return (
    <View style={{ width: '90%', alignSelf: 'center' }}>
      <PlayerHud />
      <Board useSquareSize={squareSizeState}>
        <Pieces squareSize={squareSizeState[0]} />
      </Board>
      <PlayerHud isUser />
    </View>
  );
}
