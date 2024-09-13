/* eslint-disable react-hooks/rules-of-hooks */
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { Animated, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface PieceProps {
  isQueen?: boolean;
  isMyPiece?: boolean;
  gridSize: number;
  x: number;
  y: number;
}

export function Piece(props: PieceProps) {
  const { styles } = useStyles(stylesPaia);
  const [wSquare, setWSquare] = useState(0);
  const data = useMatchSocket().data as MatchPaiado;

  const iAmPlayer1 = data.myPlayer.pieces[0].y === 0;
  const xPaiado = iAmPlayer1 ? props.x : 7 - props.x;
  const yPaiado = iAmPlayer1 ? props.y : 7 - props.y;

  const pan = useMemo(() => new Animated.ValueXY({ x: xPaiado * wSquare, y: yPaiado * wSquare }), [wSquare]);

  useEffect(() => {
    if (!wSquare) return;

    Animated.timing(pan, {
      toValue: { x: xPaiado * wSquare, y: yPaiado * wSquare },
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [wSquare, pan, xPaiado, yPaiado]);

  return (
    <>
      <Animated.View
        onLayout={(e) => setWSquare(e.nativeEvent.layout.width)}
        style={[
          styles.container(props.gridSize),
          {
            left: xPaiado * wSquare,
            top: yPaiado * wSquare,
          },
        ]}
      >
        <View style={styles.piece(props.isMyPiece)}>
          {props.isQueen && (
            <Image
              source={
                props.isMyPiece
                  ? require('@/assets/marca-do-rei_black.png')
                  : require('@/assets/marca-do-rei_white.png')
              }
              style={styles.image}
            />
          )}
        </View>
      </Animated.View>
    </>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: (gridSize: number) => ({
    position: 'absolute',
    width: `${100 / gridSize}%`,
    aspectRatio: 1,
  }),
  piece(isMyPiece = false) {
    return {
      margin: 'auto',
      width: '80%',
      aspectRatio: 1,
      borderRadius: 25,
      backgroundColor: isMyPiece ? 'white' : 'black',
    };
  },
  image: {
    margin: 'auto',
    height: '85%',
    aspectRatio: 1,
  },
}));
