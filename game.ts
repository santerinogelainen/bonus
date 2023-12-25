const game = ref<Game>({
  players: [],
  rounds: []
});

const gameStorageKey = "current-game";

const loadGame = () => {
  const json = localStorage.getItem(gameStorageKey);
  if (json) {
    const savedGame = JSON.parse(json) as Game;
    game.value = savedGame;
  }
};

const saveGame = () => {
  if (game.value) {
    const json = JSON.stringify(game.value);
    localStorage.setItem(gameStorageKey, json);
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
  onMounted(() => {
    if (!game.value) {
      loadGame();
    }
  });
}

export default game;