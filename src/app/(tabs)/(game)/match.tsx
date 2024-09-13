import Board from '@/components/game/Board';
import { Piece } from '@/components/game/Piece';
import PlayerHud from '@/components/game/PlayerHud';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Match() {
  const socket = useMatchSocket();
  const match = socket.data as MatchPaiado;
  const { styles } = useStyles(stylesPaia);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: '90%' }}>
        <PlayerHud player={match.myPlayer} isTurn />
        <View style={{ width: '100%' }}>
          <Board gridSize={8} />
          {match.playerOponent.pieces.map((piece) => (
            <Piece key={piece.id} isQueen={piece.queen} x={piece.x} y={piece.y} gridSize={8} />
          ))}
          {match.myPlayer.pieces.map((piece) => (
            <Piece key={piece.id} isQueen={piece.queen} x={piece.x} y={piece.y} isMyPiece gridSize={8} />
          ))}
        </View>
        <PlayerHud player={match.playerOponent} isTurn={false} />
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({}));
