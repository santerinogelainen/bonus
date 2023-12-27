import round from '~/logic/round';
import game from './game';
import { calculatePlayerPoints, calculatePoints } from './points';

const answer = computed(() => round.value.guesses.find((x) => !x.answered));
export const answerer = computed(() =>
  answer.value ? game.value.players[answer.value.playerId] : undefined
);

export const answerNumber = (n: number) => {
  if (answer.value && answerer.value) {
    answer.value.answer = n;
    answer.value.points = calculatePoints(answer.value);
    answerer.value.points = calculatePlayerPoints(
      game.value.rounds,
      answerer.value.id
    );
    answer.value.answered = true;
  }
};

export const unanswerNumber = (): boolean => {
  const lastAnswer = round.value.guesses.findLast((x) => x.answered);

  if (lastAnswer) {
    lastAnswer.answer = undefined;
    lastAnswer.points = undefined;
    lastAnswer.answered = false;

    const lastAnswerer = game.value.players[lastAnswer.playerId];
    lastAnswerer.points = calculatePlayerPoints(
      game.value.rounds,
      lastAnswerer.id
    );
    return true;
  }

  return false;
}

export default answer;