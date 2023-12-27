import game from "./game";
import { getCardCount, getNextPlayer } from "./player";

const round = computed(() => game.value.rounds.at(-1)!);
export const dealer = computed(() => game.value.players.get(round.value.dealerId)!);

export const getNextCards = () => {
  const players = game.value.players.size;
  const maxCards = getCardCount(players) / players;

  if (round.value.id >= maxCards * 2 + 1) {
    return undefined;
  }

  if (round.value.id < maxCards) {
    return round.value.cards + 1;
  }

  if (round.value.id > maxCards) {
    if (round.value.cards === 1) {
      return maxCards;
    }

    return round.value.cards - 1;
  }

  return maxCards;
}

export const getNextRound = () => {
  const cards = getNextCards();

  if (cards === undefined) {
    return undefined;
  }

  return {
    id: round.value.id + 1,
    cards,
    guesses: [],
    dealerId: getNextPlayer(round.value.dealerId).id,
  };
}

export default round;