<template>
  <v-btn @click="continueGame" v-if="game.isLoaded">Jatka peliä</v-btn>
  <v-btn @click="createNewGame">Uusi peli</v-btn>
</template>

<script setup lang="ts">
import game, { newGame } from '~/logic/game';
import { addPlayer } from '~/logic/player';

const continueGame = () => {
  if (game.value.isFinished) {
    navigateTo("/finished");
  } else if (game.value.rounds.length > 0) {
    navigateTo("/rounds");
  } else {
    navigateTo("/players");
  }
}

const createNewGame = () => {
  game.value = newGame();

  // Add 3 players (min)
  addPlayer();
  addPlayer();
  addPlayer();

  // Start automatic saves
  game.value.isLoaded = true;
  navigateTo("/players");
}

useHead({
  title: `Etusivu - Bonus`
});
</script>