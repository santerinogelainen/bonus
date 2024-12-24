export type Suit = "diamond" | "heart" | "club" | "spade";
export type PlayerId = string;
export type GameState =
  | "initializing"
  | "players"
  | "deal"
  | "guess"
  | "play"
  | "answer"
  | "finished";

export type Player = {
  id: PlayerId;
  name: string;
  points: number;
};

export type RoundGuess = {
  playerId: PlayerId;
  answered: boolean;
  guess?: number;
  answer?: number;
  points?: number;
};

export type Round = {
  id: number;
  cards: number;
  guesses: Array<RoundGuess>;
  dealerId: PlayerId;
  suit?: Suit;
};

export type RoundResult = {
  cards: number;
  guesses: Map<PlayerId, RoundGuess>;
};

export type Game = {
  state: GameState;
  players: Record<PlayerId, Player>;
  playerCount: number;
  rounds: Array<Round>;
};

export type GameTotals = {
  playerId: string;
  points: number;
};
