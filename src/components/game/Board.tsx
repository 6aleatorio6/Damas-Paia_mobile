import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const gridSize = 8;

interface Props extends PropsWithChildren {
  useSquareSize: [number, (size: number) => void];
}
export default function Board({ children, useSquareSize }: Props) {
  const { styles } = useStyles(stylesPaia);
  const [squareSize, setSquareSize] = useSquareSize;
  const match = useMatchSocket().data as MatchPaiado;
  const iAmPlayer1 = match.myPlayer.pieces[0].y === 0;

  const squares = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isBlack = (row + col) % 2 === 1;
      squares.push(<View key={`${row}-${col}`} style={styles.square(isBlack, gridSize)} />);
    }
  }

  return (
    <View
      onLayout={(e) => setSquareSize(e.nativeEvent.layout.width / gridSize)}
      style={styles.board(iAmPlayer1)}
    >
      {squares}
      {!!squareSize && children}
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  board: (rotate180 = false) => ({
    position: 'relative',
    transform: rotate180 ? [{ rotate: '180deg' }] : undefined,
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }),
  square: (isBlack: boolean, gridSize: number) => ({
    width: `${100 / gridSize}%`,
    height: `${100 / gridSize}%`,
    backgroundColor: theme.colors[isBlack ? 'bodySec' : 'textPri'],
  }),
}));
