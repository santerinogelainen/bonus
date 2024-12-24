import type { Player, PlayerId, Round } from "~/types";
import game from "./game";
import { createPlayer, getCardCount, getNextPlayer } from "./players";
import { getRandomItem } from "./utils";
import { Suit } from "~/enums";
import { nextGuesser } from "./guess";

const getFirstRound = () => {
  return {
    id: 1,
    cards: 1,
    dealerId: getRandomItem(Object.values(game.value.players))?.id,
    guesses: []
  }
};

const round = computed<Round>(() => game.value.rounds.at(-1) || getFirstRound());
export const dealer = computed<Player>(() => game.value.players[round.value.dealerId] || createPlayer());
export const options = computed(() => [...Array(round.value.cards + 1).keys()]);

const getNextCards = (maxCards: number) => {
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

const getNextRound = (): Round | undefined => {
  const players = game.value.playerCount;
  const maxCards = getCardCount(players) / players;
  const cards = getNextCards(maxCards);

  if (cards === undefined) {
    return undefined;
  }

  const newRound: Round = {
    id: round.value.id + 1,
    cards,
    guesses: [],
    dealerId: getNextPlayer(round.value.dealerId).id
  };

  if (cards === maxCards) {
    newRound.suit = getRandomItem(Object.values(Suit))
  }

  return newRound;
}

export const nextRound = () => {
  const nextRound = getNextRound();
  if (nextRound) {
    game.value.rounds.push(nextRound);
    return nextGuesser();
  }
  return false;
}

export const firstRound = () => {
  game.value.rounds.push(getFirstRound());
  return nextGuesser();
}

export default round;