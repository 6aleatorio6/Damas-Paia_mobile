import { useMemo } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function Board({ gridSize }: { gridSize: number }) {
  const { styles } = useStyles(stylesPaia);

  const squares = useMemo(() => {
    const squares = [];

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const isBlack = (row + col) % 2 === 1;
        squares.push(<View key={`${row}-${col}`} style={styles.square(isBlack, gridSize)} />);
      }
    }
    return squares;
  }, [gridSize]);

  return <View style={styles.board}>{squares}</View>;
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
