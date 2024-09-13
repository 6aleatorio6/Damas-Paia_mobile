import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface Props extends PropsWithChildren {
  gridSize: number;
  useSquareSize: [number, (size: number) => void];
}
export default function Board({ gridSize, children, useSquareSize }: Props) {
  const { styles } = useStyles(stylesPaia);
  const [squareSize, setSquareSize] = useSquareSize;

  const squares = [];
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const isBlack = (row + col) % 2 === 1;
      squares.push(<View key={`${row}-${col}`} style={styles.square(isBlack, gridSize)} />);
    }
  }

  return (
    <View onLayout={(e) => setSquareSize(e.nativeEvent.layout.width / gridSize)} style={styles.board}>
      {squares}
      {!!squareSize && children}
    </View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  board: {
    width: '100%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: (isBlack: boolean, gridSize: number) => ({
    width: `${100 / gridSize}%`,
    height: `${100 / gridSize}%`,
    backgroundColor: theme.colors[isBlack ? 'bodySec' : 'textPri'],
  }),
}));
