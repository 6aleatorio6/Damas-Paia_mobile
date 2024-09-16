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
  const match = socket.data.matchInitData;
  const [opPieces, setOpPieces] = useState(() => createPiecesProps(match.playerOponent.pieces, squareSize));
  const [myPieces, setMyPieces] = useState(() => createPiecesProps(match.myPlayer.pieces, squareSize));

  useEffect(() => {
    socket.on('match:update', (pieceUpdate) => {
      const pieceMov = getPieceById(pieceUpdate.piece.id, myPieces, opPieces);
      const anima = [] as Animated.CompositeAnimation[];

      for (const i in pieceUpdate.piece.movs) {
        const mov = pieceUpdate.piece.movs[i];
        const deadId = pieceUpdate.deads[i];

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

      if (pieceUpdate.piece.queen !== pieceMov.isQueen) {
        pieceMov.isQueen = pieceUpdate.piece.queen;
        anima.push(
          Animated.timing(pieceMov.fadeQueen, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        );
      }

      Animated.sequence(anima).start(() => {
        const setPieces = opPieces.find((piece) => piece.id === pieceUpdate.piece.id)
          ? setMyPieces
          : setOpPieces;

        setPieces((pieces) => pieces.filter((piece) => !pieceUpdate.deads.includes(piece.id)));
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
