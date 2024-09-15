import Board from '@/components/game/Board';
import Pieces from '@/components/game/Pieces';
import PlayerHud from '@/components/game/PlayerHud';
import { useState } from 'react';
import { View } from 'react-native';

export default function Match() {
  const [squareSize, setSquareSize] = useState(0);

  return (
    <View style={{ width: '90%', alignSelf: 'center' }}>
      <PlayerHud />
      <Board useSquareSize={[squareSize, setSquareSize]}>
        <Pieces squareSize={squareSize} />
      </Board>
      <PlayerHud isUser />
    </View>
  );
}
