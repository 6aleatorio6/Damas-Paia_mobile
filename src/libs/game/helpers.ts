import { PieceProps } from '@/components/game/Piece';
import { Animated } from 'react-native';

/**
 *  Convert pieces to PieceProps[]
 */
export const createPiecesProps = (pieces: Piece[], squareSize: number) => {
  return pieces.map((piece) => ({
    squareSize,
    isQueen: !!piece.queen,
    id: piece.id,
    fadeQueen: new Animated.Value(0),
    morrerPiece: new Animated.Value(1), // opacidade
    movePiece: new Animated.ValueXY({ x: piece.x * squareSize, y: piece.y * squareSize }),
  })) as PieceProps[];
};

/**
 * Find a piece in myPieces or opPieces by id
 */
export const getPieceById = (id: number, myPieces: PieceProps[], opPieces: PieceProps[]) => {
  const opPiece = opPieces.find((piece) => piece.id === id);
  const myPiece = myPieces.find((piece) => piece.id === id);

  const piece = opPiece || myPiece;
  if (!piece) throw new Error('Peça não encontrada');

  return piece;
};
