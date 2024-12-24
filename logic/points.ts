import type { PlayerId, Round, RoundGuess } from "~/types";
import { sortBy } from "./utils";
import game from "./game";

export const calculatePoints = (guess: RoundGuess): number | undefined => {
  if (guess.answer === undefined || guess.guess === undefined) {
    return undefined;
  }

  let points = guess.answer;

  if (guess.answer === guess.guess) {
    points += 5;
  }

  return points;
};

export const calculatePlayerPoints = (
  rounds: Round[],
  playerId: PlayerId
): number => {
  return rounds.reduce<number>((total, round) => {
    const guess = round.guesses.find((x) => x.playerId === playerId);
    return total + (guess?.points ?? 0);
  }, 0);
}

export const calculatePlacements = () => {
  const sorted = sortBy(Object.values(game.value.players), "points").reverse()
  sorted.forEach((x, i) => {
    x.placement = i;
  })
}
