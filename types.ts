type Suit = "diamond" | "heart" | "club" | "spade";
type PlayerId = string;

type Player = {
  id: PlayerId;
  name: string;
}

type RoundGuess = {
  playerId: PlayerId;
  guess: number;
  answer: number;
}

type Round = {
  id: number;
  cards: number;
  guesses: Array<RoundGuess>;
  dealerId: PlayerId;
  suit: Suit;
}

type Game = {
  players: Array<Player>;
  rounds: Array<Round>;
}