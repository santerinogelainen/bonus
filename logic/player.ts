import { v4 as uuidv4 } from "uuid";
import game from "./game";

export const createPlayer = (): Player => ({
  id: uuidv4(),
  name: "",
  points: 0
});

export const addPlayer = () => {
  const player = createPlayer();
  game.value.players.set(player.id, player);
}