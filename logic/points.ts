import type { PlayerId, Round, RoundGuess } from "~/types";

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
): number =>
  rounds.reduce<number>((total, round) => {
    const guess = round.guesses.find((x) => x.playerId === playerId);
    return total + (guess?.points ?? 0);
  }, 0);
