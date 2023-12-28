import game from "./game";
import { createPlayer, getCardCount, getNextPlayer } from "./player";
import { getRandomItem } from "./utils";

export const getFirstRound = (dealerId?: PlayerId) => {
  return {
    id: 1,
    cards: 1,
    dealerId: dealerId || getRandomItem(Object.values(game.value.players))?.id,
    guesses: []
  }
};

const round = computed<Round>(() => game.value.rounds.at(-1) || getFirstRound(''));
export const dealer = computed<Player>(() => game.value.players[round.value.dealerId] || createPlayer());
export const options = computed(() => [...Array(round.value.cards + 1).keys()]);

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

export const nextGuesser = () => {
  if (round.value.guesses.length === game.value.playerCount) {
    return;
  }
  const currentGuesserId = round.value.guesses.at(-1)?.playerId || round.value.dealerId;
  const nextGuesser = getNextPlayer(currentGuesserId);
  round.value.guesses.push({
    playerId: nextGuesser.id,
    guess: undefined,
    answer: undefined,
    answered: false,
  });
};

export default round;