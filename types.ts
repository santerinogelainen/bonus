type Suit = "diamond" | "heart" | "club" | "spade";
type PlayerId = string;

type Player = {
  id: PlayerId;
  name: string;
  points: number;
}

type RoundGuess = {
  playerId: PlayerId;
  answered: boolean;
  guess?: number;
  answer?: number;
  points?: number;
}

type Round = {
  id: number;
  cards: number;
  guesses: Array<RoundGuess>;
  dealerId: PlayerId;
  suit?: Suit;
}

type Game = {
  canSave: boolean;
  maxRoundCards: number;
  players: Map<PlayerId, Player>;
  rounds: Array<Round>;
}

type GameTotals = {
  playerId: string;
  points: number;
}