<template>
  <v-btn @click="createNewGame">Uusi peli</v-btn>
</template>

<script setup lang="ts">
import game, { newGame } from '~/logic/game';
import { addPlayer } from '~/logic/player';

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
</script>~/logic/game