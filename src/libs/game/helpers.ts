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

/**
 * Convert a string to a Date object
 */
export const stringToDateString = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculate the duration in minutes between two date strings
 */
export const calculateDurationInMinutes = (startDateString: string, endDateString: string) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Data inválida');
  }

  const durationInMilliseconds = endDate.getTime() - startDate.getTime();
  const durationInMinutes = Math.round(durationInMilliseconds / (1000 * 60));

  return `${durationInMinutes} min`;
};
