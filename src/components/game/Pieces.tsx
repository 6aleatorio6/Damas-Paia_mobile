import { useMatchSocket } from '@/libs/apiHooks/socketIo/MatchCtx';
import { useEffect, useState } from 'react';
import { Piece } from './Piece';
import { Animated } from 'react-native';

type MovPiece = UpdatePieces['piece'] & { anima?: Animated.CompositeAnimation[] };

export default function Pieces({ squareSize }: { squareSize: number }) {
  const socket = useMatchSocket();
  const match = socket.data as MatchPaiado;

  const [myPieces, setMyPieces] = useState(transformInitial(match.myPlayer.pieces));
  const [opPieces, setOpPieces] = useState(transformInitial(match.playerOponent.pieces));

  useEffect(() => {
    socket.on('match:update', (pieceUpdate) => {
      const [lado, index] = getPieceById(pieceUpdate.piece.id, myPieces, opPieces);
      const setPiece = lado === 'my' ? setMyPieces : setOpPieces;

      setPiece((prev) => {
        const newPieces = [...prev];
        newPieces[index] = pieceUpdate.piece;

        return newPieces;
      });
    });

    return () => socket.off('match:update') as any;
  }, []);

  return (
    <>
      {myPieces.map((p) => (
        <Piece key={p.id} isQueen={p.queen} squareSize={squareSize} isMyPiece />
      ))}
      {opPieces.map((p) => (
        <Piece key={p.id} isQueen={p.queen} squareSize={squareSize} />
      ))}
    </>
  );
}

const transformInitial = (pieces: Piece[]): MovPiece[] =>
  pieces.map((e) => ({ id: e.id, movs: [{ x: e.x, y: e.y }], queen: !!e.queen }));

const getPieceById = (id: number, mPieces: MovPiece[], oPieces: MovPiece[]) => {
  const myPieceIndex = mPieces.findIndex((p) => p.id === id);
  const opPieceIndex = oPieces.findIndex((p) => p.id === id);

  const index = myPieceIndex !== -1 ? myPieceIndex : opPieceIndex;
  const lado = myPieceIndex !== -1 ? 'my' : 'op';
  return [lado, index] as const;
};
