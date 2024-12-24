import game from '~/logic/game';
import round from '~/logic/round';
import { getNextPlayer } from './players';
import type { RoundGuess } from '~/types';

const guess = computed(() => round.value.guesses.at(-1));
export const guesser = computed(() =>
  guess.value ? game.value.players[guess.value.playerId] : undefined
);

export const getNextGuess = () => {
  if (round.value.guesses.length === game.value.playerCount) {
    return undefined;
  }
  const currentGuesserId = round.value.guesses.at(-1)?.playerId || round.value.dealerId;
  const nextGuesser = getNextPlayer(currentGuesserId);
  const nextGuess: RoundGuess = {
    playerId: nextGuesser.id,
    guess: undefined,
    answer: undefined,
    answered: false,
  };
  return nextGuess;
};

export const nextGuesser = () => {
  const nextGuess = getNextGuess();
  if (nextGuess) {
    round.value.guesses.push(nextGuess);
    return true;
  }
  return false;
}

export const guessNumber = (n: number) => {
  if (guess.value) {
    guess.value.guess = n;
  }
};

export const unguessNumber = (): boolean => {
  console.log(guess.value, round.value.guesses)
  if (!guess.value) {
    return false;
  }

  if (guess.value.guess === undefined) {
    round.value.guesses.pop();
  }

  if (round.value.guesses.length === 0) {
    return false;
  }

  guess.value.guess = undefined;
  return true;
}

export default guess;