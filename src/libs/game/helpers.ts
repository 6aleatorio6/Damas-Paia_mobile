import { PieceProps } from '@/components/game/Piece';
import { Animated } from 'react-native';

/**
 *  Convert pieces to PieceProps[]
 */
export const createPiecesProps = (pieces: Piece[], player: Players, squareSize: number) => {
  return pieces
    .filter((piece) => piece.player === player)
    .map(({ id, x, y, isQueen }) => ({
      squareSize,
      isQueen,
      id,
      fadeQueen: new Animated.Value(0),
      morrerPiece: new Animated.Value(1), // opacidade
      movePiece: new Animated.ValueXY({ x: x * squareSize, y: y * squareSize }),
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
