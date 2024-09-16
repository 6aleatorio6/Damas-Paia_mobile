/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { Piece, PieceProps } from './Piece';

export default function Pieces({ squareSize }: { squareSize: number }) {
  const socket = useMatchSocket();
  const match = socket.data as MatchPaiado;
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
        const setPieces = opPieces.find((piece) => piece.id !== pieceUpdate.piece.id)
          ? setOpPieces
          : setMyPieces;

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

type PiecePropsPaiado = PieceProps & { isQueen: boolean };

const createPiecesProps = (pieces: Piece[], squareSize: number) => {
  return pieces.map((piece) => ({
    squareSize,
    isQueen: !!piece.queen,
    id: piece.id,
    fadeQueen: new Animated.Value(0),
    morrerPiece: new Animated.Value(1), // opacidade
    movePiece: new Animated.ValueXY({ x: piece.x * squareSize, y: piece.y * squareSize }),
  })) as PiecePropsPaiado[];
};

const getPieceById = (id: number, myPieces: PiecePropsPaiado[], opPieces: PiecePropsPaiado[]) => {
  const opPiece = opPieces.find((piece) => piece.id === id);
  const myPiece = myPieces.find((piece) => piece.id === id);

  const piece = opPiece || myPiece;
  if (!piece) throw new Error('Peça não encontrada');

  return piece;
};
