import type { Game, GameState } from "~/types";

export const newGame = (): Game => ({
  state: 'initializing',
  players: {},
  playerCount: 0,
  rounds: []
});

const game = ref<Game>(newGame());
const gameStorageKey = "current-game";
export const gameRoute = computed(() => getGameRoute(game.value.state));

const loadGame = () => {
  const json = localStorage.getItem(gameStorageKey);
  if (json) {
    const savedGame = JSON.parse(json) as Game;
    game.value = savedGame;
  }
};

const saveGame = () => {
  if (game.value && game.value.state !== 'initializing') {
    const json = JSON.stringify(game.value);
    localStorage.setItem(gameStorageKey, json);
  }
}

export const getGameRoute = (state: GameState) => {
  if (state === "finished") {
    return "/finished";
  } else if (state === "players") {
    return "/players";
  } else {
    return "/rounds";
  }
}

export const useGameSaver = () => {
  watchEffect(() => {
    if (game.value) {
      saveGame();
    }
  });
}

export const useGameLoader = () => {
  const loaded = ref(false);

  onMounted(() => {
    if (!loaded.value && game.value.state === "initializing") {
      loadGame();
    }

    loaded.value = true;
  });

  return loaded;
}

export default game;