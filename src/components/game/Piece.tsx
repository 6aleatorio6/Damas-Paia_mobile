import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Animated, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export interface PieceProps {
  isMyPiece?: boolean;
  isQueen: boolean;
  squareSize: number;
  id: number;
  fadeQueen: Animated.Value;
  movePiece: Animated.ValueXY;
  morrerPiece: Animated.Value; // fade
  pathState?: ReturnType<typeof useState<[number, Coord[]] | null>>;
}
export function Piece(props: PieceProps) {
  const { styles } = useStyles(stylesPaia);
  const socket = useMatchSocket();
  const iAmPlayer1 = socket.data.myPlayer === 'player1';
  const [path, setPath] = props.pathState || [];

  const getPaths = async () => {
    setPath?.([props.id, await socket.emitWithAck('match:paths', +props.id)]);
  };

  return (
    <>
      {path &&
        path[0] === props.id &&
        path[1].map((p) => (
          <Pressable
            key={`${p.x}-${p.y}`}
            style={styles.path(props.squareSize, p.x, p.y)}
            onPress={() => {
              socket.emit('match:move', { id: props.id, to: { x: p.x, y: p.y } });
              setPath?.(null);
            }}
          />
        ))}
      <Animated.View
        style={[
          styles.container(props.squareSize),
          { opacity: props.morrerPiece },
          { transform: [{ translateX: props.movePiece.x }, { translateY: props.movePiece.y }] },
        ]}
      >
        <Pressable onPress={getPaths} style={styles.piece(props.isMyPiece)}>
          <Animated.View style={{ opacity: props.fadeQueen, margin: 'auto' }}>
            <Image
              source={
                props.isMyPiece
                  ? require('@/assets/marca-do-rei_black.png')
                  : require('@/assets/marca-do-rei_white.png')
              }
              style={styles.image(iAmPlayer1)}
            />
          </Animated.View>
        </Pressable>
      </Animated.View>
    </>
  );
}

const stylesPaia = createStyleSheet(({ colors }) => ({
  path: (squareSize: number, left = 0, top = 0) => ({
    position: 'absolute',
    width: squareSize,
    height: squareSize,
    top: top * squareSize,
    left: left * squareSize,
    backgroundColor: colors.squarePath,
  }),
  container: (squareSize: number) => ({
    position: 'absolute',
    width: squareSize,
    height: squareSize,
  }),
  piece: (isMyPiece = false) => ({
    margin: 'auto',
    width: '80%',
    aspectRatio: 1,
    borderRadius: 25,
    backgroundColor: isMyPiece ? colors.pieceLight : colors.pieceDark,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  }),
  image: (rotate = false) => ({
    transform: rotate ? [{ rotate: '180deg' }] : [],
    margin: 'auto',
    height: '97%',
    aspectRatio: 1,
  }),
}));
