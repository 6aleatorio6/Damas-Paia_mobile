import { Image } from 'expo-image';
import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

interface PieceProps {
  isMyPiece?: boolean;
  squareSize: number;
  isQueen?: boolean;
  anima?: Animated.CompositeAnimation[];
  key: number;
}

export function Piece(props: PieceProps) {
  const { styles } = useStyles(stylesPaia);
  const pan = useRef(new Animated.ValueXY()).current;
  const opaQueen = useRef(new Animated.Value(0)).current;
  const isQueenRef = useRef(props.isQueen); // não precisa de useState

  if (props.anima) {
    // animação da rainha
    if (isQueenRef.current !== props.isQueen) {
      isQueenRef.current = props.isQueen;
      props.anima.push(
        Animated.timing(opaQueen, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      );
    }

    Animated.sequence(props.anima).start();
  }

  return (
    <Animated.View style={[styles.container(props.squareSize), pan.getLayout()]}>
      <View style={styles.piece(props.isMyPiece)}>
        {isQueenRef && (
          <Image
            source={
              props.isMyPiece
                ? require('@/assets/marca-do-rei_black.png')
                : require('@/assets/marca-do-rei_white.png')
            }
            style={styles.image(opaQueen)}
          />
        )}
      </View>
    </Animated.View>
  );
}

const stylesPaia = createStyleSheet((theme) => ({
  container: (squareSize: number) => ({
    position: 'absolute',
    width: squareSize,
    height: squareSize,
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
  image: (opa: Animated.Value) => ({
    opacity: opa,
    margin: 'auto',
    height: '85%',
    aspectRatio: 1,
  }),
}));
