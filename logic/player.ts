import { v4 as uuidv4 } from "uuid";
import game from "./game";
import { getRange } from "./utils";

export const createPlayer = (): Player => ({
  id: uuidv4(),
  name: "",
  points: 0
});

export const addPlayer = () => {
  const player = createPlayer();
  game.value.players[player.id] = player;
  game.value.playerCount = Object.keys(game.value.players).length;
}

export const removePlayer = (id: PlayerId) => {
  if (Object.keys(game.value.players).length <= 3) {
    alert("Pelaajaa ei voida poistaa. Pelissä tulee olla vähintään 3 pelaajaa.")
    return;
  }
  delete game.value.players[id];
  game.value.playerCount = Object.keys(game.value.players).length;
};

export const getNextPlayer = (currentId: string) => {
  const players = Object.values(game.value.players);
  const nextGuesserIndex = players.findIndex((x) => x.id === currentId) + 1;
  return players[nextGuesserIndex] || players[0];
};

export const getCardRange = (playerCount: number) => {
  if (playerCount <= 4) {
    return getRange(6, 14);
  }

  return getRange(5, 14);
}

export const getCardCount = (playerCount: number) => {
  const range = getCardRange(playerCount);
  return range.length * 4; // 4 suits
}