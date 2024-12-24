import type { GameState } from "~/types";
import game, { getGameRoute } from "./game";
import round, { firstRound, nextRound, previousRound } from "./round";
import { setUnknownPlayers } from "./players";
import { nextGuesser, unguessNumber } from "./guess";
import { unanswerNumber } from "./answer";

type NextGameStateHandler = () => GameState;

const state = computed({
  get: () => game.value.state,
  set: (val) => game.value.state = val 
});

const nextStateHandlers: Record<GameState, NextGameStateHandler> = {
  initializing: () => "players",
  players: () => {
    setUnknownPlayers();
    firstRound();
    return "deal";
  },
  deal: () => {
    nextGuesser();
    return "guess"
  },
  guess: () => nextGuesser() ? "guess" : "play",
  play: () => "answer",
  answer: () => {
    if (round.value.guesses.every(x => x.answered)) {
      return nextRound() ? "deal" : "finished";
    }
    return "answer";
  },
  finished: () => "finished"
}

export const nextState = () => {
  const handler = nextStateHandlers[state.value];
  const newState = handler();
  const newRoute = getGameRoute(newState)
  state.value = newState;
  navigateTo(newRoute);
}

const previousStateHandlers: Record<GameState, NextGameStateHandler> = {
  initializing: () => "players",
  players: () => "players",
  deal: () => previousRound() ? "answer" : "players",
  guess: () => unguessNumber() ? "guess" : "deal",
  play: () => {
    unguessNumber();
    return "guess";
  },
  answer: () => unanswerNumber() ? "answer" : "play",
  finished: () => "finished"
}

export const previousState = () => {
  const handler = previousStateHandlers[state.value];
  const newState = handler();
  const newRoute = getGameRoute(newState)
  state.value = newState;
  navigateTo(newRoute);
}

export default state;