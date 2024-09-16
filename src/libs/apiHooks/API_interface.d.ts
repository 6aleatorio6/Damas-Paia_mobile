interface User {
  uuid: string;
  username: string;
  email: string;
  password: string;
}

interface Match {
  uuid: string;
  dateInit: string;
  dateEnd?: string;
  player1: Pick<User, 'username' | 'uuid'>;
  player2: Pick<User, 'username' | 'uuid'>;
  turn: Pick<User, 'username' | 'uuid'>;
  winner: Pick<User, 'username' | 'uuid'>;
}

interface Piece {
  id: number;
  x: number;
  y: number;
  queen?: boolean;
}

//
//
// MatchService
type UUID = string;
type Coord = { x: number; y: number };
type PlayerPaiado = Pick<User, 'username' | 'uuid'> & { pieces: Piece[] };
type MoveDto = { id: number; to: { x: number; y: number } };

type UpdatePieces = {
  deads: number[];
  piece: {
    id: number;
    queen: boolean;
    movs: Coord[];
  };
};

type MatchPaiado = {
  myPlayer: PlayerPaiado;
  playerOponent: PlayerPaiado;
  matchUuid: UUID;
  dateInit: Date;
  turn: UUID;
};
