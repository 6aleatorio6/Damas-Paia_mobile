import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { Piece } from './Piece';
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { createPiecesProps, getPieceById } from '@/libs/game/helpers';

interface PiecesProps {
  squareSize: number;
}
export default function Pieces({ squareSize }: PiecesProps) {
  const socket = useMatchSocket();
  const { myPlayer, opPlayer, piecesInit } = socket.data;
  const [opPieces, setOpPieces] = useState(() => createPiecesProps(piecesInit, opPlayer, squareSize));
  const [myPieces, setMyPieces] = useState(() => createPiecesProps(piecesInit, myPlayer, squareSize));

  useEffect(() => {
    socket.on('match:update', ({ chainOfMotion, isQueen, piecesDeads, pieceId }) => {
      const pieceMov = getPieceById(pieceId, myPieces, opPieces);
      const anima = [] as Animated.CompositeAnimation[];

      for (const i in chainOfMotion) {
        const mov = chainOfMotion[i];
        const deadId = piecesDeads[i];

        anima.push(
          Animated.timing(pieceMov.movePiece, {
            toValue: { x: mov.x * squareSize, y: mov.y * squareSize },
            duration: 100,
            useNativeDriver: true,
          }),
        );

        if (deadId === undefined) continue;
        // Animação de morte = opacidade 0
        const pieceDead = getPieceById(deadId, myPieces, opPieces);
        anima.push(
          Animated.timing(pieceDead.morrerPiece, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }),
        );
      }

      if (isQueen !== pieceMov.isQueen) {
        pieceMov.isQueen = isQueen;
        anima.push(
          Animated.timing(pieceMov.fadeQueen, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        );
      }

      Animated.sequence(anima).start(() => {
        const setPieces = opPieces.find((piece) => piece.id === pieceId) ? setMyPieces : setOpPieces;

        setPieces((pieces) => pieces.filter((piece) => !piecesDeads.includes(piece.id)));
      });
    });

    return () => socket.off('match:update') as any;
  }, []);

  const pathState = useState<[number, Coord[]] | null>();

  return (
    <>
      {opPieces.map((piece) => (
        <Piece key={piece.id} {...piece} />
      ))}
      {myPieces.map((piece) => (
        <Piece key={piece.id} {...piece} isMyPiece pathState={pathState} />
      ))}
    </>
  );
}
