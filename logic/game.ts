export const newGame = (): Game => ({
  isLoaded: false,
  isFinished: false,
  players: {},
  playerCount: 0,
  rounds: []
});

const game = ref<Game>(newGame());
const gameStorageKey = "current-game";

const loadGame = () => {
  const json = localStorage.getItem(gameStorageKey);
  if (json) {
    const savedGame = JSON.parse(json) as Game;
    game.value = savedGame;
  }
};

const saveGame = () => {
  if (game.value && game.value.isLoaded) {
    const json = JSON.stringify(game.value);
    localStorage.setItem(gameStorageKey, json);
  }
}

export const getContinueGamePath = () => {
  if (game.value.isFinished) {
    return "/finished";
  } else if (game.value.rounds.length > 0) {
    return "/rounds";
  } else {
    return "/players";
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
    if (!loaded.value && !game.value.isLoaded) {
      loadGame();
      console.log("Loaded game...");
    }

    loaded.value = true;
  });

  return loaded;
}

export default game;