import type { GameState } from "~/types";
import game, { getGameRoute } from "./game";
import round, { firstRound, nextRound } from "./round";
import { setUnknownPlayers } from "./players";
import { nextGuesser } from "./guess";

type NextGameStateHandler = () => GameState;

const state = computed({
  get: () => game.value.state,
  set: (val) => game.value.state = val 
});

const stateHandlers: Record<GameState, NextGameStateHandler> = {
  initializing: () => "players",
  players: () => {
    setUnknownPlayers();
    firstRound();
    return "deal";
  },
  deal: () => "guess",
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
  const handler = stateHandlers[state.value];
  const newState = handler();
  const newRoute = getGameRoute(newState)
  state.value = newState;
  navigateTo(newRoute);
}

export default state;