import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Animated, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export interface PieceProps {
  isMyPiece?: boolean;
  squareSize: number;
  id: number;
  fadeQueen: Animated.Value;
  movePiece: Animated.ValueXY;
  morrerPiece: Animated.Value; // fade
  clearPath?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}
export function Piece(props: PieceProps) {
  const { styles } = useStyles(stylesPaia);
  const socket = useMatchSocket();
  const iAmPlayer1 = !!socket.data.myPlayer.pieces.find((p) => p.y === 0);
  const [path, setPath] = useState<Coord[]>([]);
  const [morreu, setMorreu] = useState(false);

  const [clearPath, setClearPath] = props.clearPath || [];
  useEffect(() => {
    setPath([]);
  }, [clearPath]);

  const getPaths = async () => {
    props.clearPath?.[1]((e) => !e);
    setPath(await socket.emitWithAck('match:paths', +props.id));
  };

  useEffect(() => {
    const idM = props.morrerPiece.addListener(({ value }) => {
      if (value === 1) return 'está vivo :C';
      setMorreu(true);
      props.morrerPiece.removeListener(idM);
    });

    return () => props.morrerPiece.removeListener(idM);
  }, []);
  if (morreu) return null;

  return (
    <>
      {path.map((p) => (
        <Pressable
          key={`${p.x}-${p.y}`}
          style={styles.path(props.squareSize, p.x, p.y)}
          onPress={() => {
            socket.emit('match:move', { id: props.id, to: { x: p.x, y: p.y } });
            setClearPath?.((e) => !e);
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

const stylesPaia = createStyleSheet((_theme) => ({
  path: (squareSize: number, left = 0, top = 0) => ({
    position: 'absolute',
    width: squareSize,
    height: squareSize,
    top: top * squareSize,
    left: left * squareSize,
    backgroundColor: 'green',
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
    backgroundColor: isMyPiece ? 'white' : 'black',
  }),
  image: (rotate = false) => ({
    transform: rotate ? [{ rotate: '180deg' }] : [],
    margin: 'auto',
    height: '85%',
    aspectRatio: 1,
  }),
}));
