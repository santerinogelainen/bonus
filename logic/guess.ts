import game from '~/logic/game';
import round, { nextGuesser } from '~/logic/round';

const guess = computed(() => round.value.guesses.at(-1));
export const guesser = computed(() =>
  guess.value ? game.value.players[guess.value.playerId] : undefined
);

export const guessNumber = (n: number) => {
  if (guess.value) {
    guess.value.guess = n;
  }
  nextGuesser();
};

export const unguessNumber = (): boolean => {
  if (!guess.value) {
    return false;
  }

  if (guess.value.guess === undefined) {
    round.value.guesses.pop();
  }

  guess.value.guess = undefined;
  return true;
}

export default guess;