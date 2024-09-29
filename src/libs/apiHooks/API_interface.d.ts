interface User {
  uuid: string;
  username: string;
  avatar?: string;
  email: string;
  password: string;
}

//
type Players = 'player1' | 'player2';

interface Match {
  uuid: UUID;
  player1: Pick<User, 'username' | 'uuid'>;
  player2: Pick<User, 'username' | 'uuid'>;
  winnerStatus: 'checkmate' | 'resign' | 'timeout' | null;
  winner: Players | null;
  turn: Players;
  dateInit: string;
  dateEnd: string | null;
}

interface Piece {
  id: number;
  player: Players;
  x: number;
  y: number;
  isQueen?: boolean;
}

type UUID = string;
type Coord = { x: number; y: number };

interface UpdatePieces {
  pieceId: number;
  isQueen: boolean;
  piecesDeads: number[];
  chainOfMotion: Coord[];
}

interface MoveDto {
  id: number;
  to: {
    x: number;
    y: number;
  };
}

interface MatchSocketData {
  openModalExit: (s: boolean) => void;
  matchInit: Match;
  piecesInit: Piece[];
  myPlayer: Players;
  opPlayer: Players;
}

// ON
interface ServerToCl {
  'match:init': (matchPaiado: Match, pieces: Piece[], youAre: Players) => void;
  'match:finish': (match: Match) => void;
  'match:update': (updatePieces: UpdatePieces) => void;
  'match:status': (turn: Players, piecesLenght: Record<Players, number>) => void;
  error: (error: Error) => void;
}

// EMIT
interface ClientToSv {
  'match:queue': (action: 'join' | 'leave', cb?: (m: string) => void) => void;
  'match:move': (moveDto: MoveDto) => void;
  'match:paths': (pieceId: number, ack?: (paths: Coord[]) => void) => void;
  'match:quit': () => void;
}
