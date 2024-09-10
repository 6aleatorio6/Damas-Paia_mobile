interface User {
  uuid: string;
  username: string;
  email: string;
  password: string;
}

interface Match {
  uuid: string;
  dateInit: Date;
  dateEnd?: Date;
  player1: User;
  player2: User;
  turn: User;
}

interface Piece {
  id: number;
  match: Match;
  player: User;
  x: number;
  y: number;
  queen?: boolean;
}

//
//
// MatchService
type UUID = string;
type Coord = { x: number; y: number };
type PlayerPaiado = User & { pieces: Omit<Piece, 'match' | 'user'>[] };
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
