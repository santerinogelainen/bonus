import game from "./game";
import { createPlayer, getCardCount, getNextPlayer } from "./player";
import { getRandomItem } from "./utils";

export const getFirstRound = (dealerId?: PlayerId) => {
  console.log(game.value);
  return {
    id: 1,
    cards: 1,
    dealerId: dealerId || getRandomItem(Object.values(game.value.players)).id,
    guesses: []
  }
};

const round = computed<Round>(() => game.value.rounds.at(-1) || getFirstRound(''));
export const dealer = computed<Player>(() => game.value.players[round.value.dealerId] || createPlayer());

export const getNextCards = () => {
  const players = game.value.playerCount;
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