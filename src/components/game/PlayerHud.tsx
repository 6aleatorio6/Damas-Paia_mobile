import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Play } from 'lucide-react-native';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { useEffect, useState } from 'react';

export default function PlayerHud({ isUser }: { isUser?: boolean }) {
  const { styles } = useStyles(stylesPaia);
  const socket = useMatchSocket();
  const { matchInit, myPlayer, opPlayer } = socket.data;
  const player = isUser ? myPlayer : opPlayer;

  const [isTurn, setTurn] = useState(matchInit.turn === player);
  const [pieceLength, setPieceLength] = useState(12);

  useEffect(() => {
    socket.on('match:status', (turn, { [player]: pieceLength }) => {
      setPieceLength(pieceLength);
      setTurn(turn === player);
    });

    return () => {
      socket.off('match:status');
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Play size={24} strokeWidth={9.3} style={styles.icon(isTurn)} />
        <Text style={styles.username}>
          {matchInit[player].username}
          {isUser && <Text style={styles.youText}> (você)</Text>}
        </Text>
      </View>
      <View style={styles.piecesCon}>
        <Text style={styles.piecesText}>PEÇAS:</Text>
        <Text style={styles.piecesNum}> {pieceLength}</Text>
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
