import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Play } from 'lucide-react-native';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { useEffect, useState } from 'react';

export default function PlayerHud({ isUser }: { isUser?: boolean }) {
  const { styles } = useStyles(stylesPaia);
  const socket = useMatchSocket();
  const match = socket.data as MatchPaiado;
  const player = isUser ? match.myPlayer : match.playerOponent;
  const [isMyTurn, setMyTurn] = useState(match.turn === player.uuid);

  useEffect(() => {
    socket.on('match:update', (_, turnoAtual) => {
      setMyTurn(turnoAtual === player.uuid);
    });

    return () => {
      socket.off('match:update');
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Play size={24} strokeWidth={9.3} style={styles.icon(isMyTurn)} />
        <Text style={styles.username}>
          {player.username}
          {isUser && <Text style={styles.youText}> (você)</Text>}
        </Text>
      </View>
      <View style={styles.piecesCon}>
        <Text style={styles.piecesText}>PEÇAS:</Text>
        <Text style={styles.piecesNum}> {player.pieces.length}</Text>
      </View>
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: (isTurn: boolean) => ({
    opacity: isTurn ? 1 : 0.5,
    marginRight: 10,
    color: theme.colors.danger,
  }),
  username: {
    color: theme.colors.textPri,
    fontWeight: 'bold',
    fontSize: 24,
  },
  youText: {
    fontSize: 14,
    color: theme.colors.textSec,
  },
  piecesText: {
    color: theme.colors.textSec,
    fontSize: 16,
    fontWeight: 'bold',
  },
  piecesNum: {
    color: theme.colors.textPri,
    fontSize: 24,
    fontWeight: 'bold',
  },
  piecesCon: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
}));
