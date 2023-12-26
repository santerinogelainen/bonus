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
}

export const useTotals = () => {
  const totalsRef = ref(new Map<PlayerId, GameTotals>());

  watchEffect(() => {
    const totals = new Map<PlayerId, GameTotals>()

    game.value.rounds.forEach(round => {
      round.guesses.forEach(guess => {
        const total = totals.get(guess.playerId) || {
          playerId: guess.playerId,
          points: 0
        };

        total.points += calculatePoints(guess) ?? 0;
        totals.set(guess.playerId, total);
      });
    });

    totalsRef.value = totals
  });

  return totalsRef;
}