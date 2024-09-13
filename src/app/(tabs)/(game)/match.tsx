import Board from '@/components/game/Board';
import { Piece } from '@/components/game/Piece';
import PlayerHud from '@/components/game/PlayerHud';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { useState } from 'react';
import { View } from 'react-native';

export default function Match() {
  const socket = useMatchSocket();
  const { myPlayer, playerOponent } = socket.data as MatchPaiado;
  const [squareSize, setSquareSize] = useState(0);

  return (
    <View style={{ width: '80%', alignSelf: 'center' }}>
      <PlayerHud />
      <Board gridSize={8} useSquareSize={[squareSize, setSquareSize]}>
        {playerOponent.pieces.map((piece) => (
          <Piece key={piece.id} isQueen={piece.queen} x={piece.x} y={piece.y} gridSize={8} />
        ))}
        {myPlayer.pieces.map((piece) => (
          <Piece key={piece.id} isQueen={piece.queen} x={piece.x} y={piece.y} isMyPiece gridSize={8} />
        ))}
      </Board>
      <PlayerHud isUser />
    </View>
  );
}
