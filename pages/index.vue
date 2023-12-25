<template>
  <v-btn @click="createNewGame">Uusi peli</v-btn>
</template>

<script setup lang="ts">
import game, { newGame } from '~/logic/game';
import { createPlayer } from '~/logic/player';

const createNewGame = () => {
  game.value = newGame();

  // Add 3 players (min)
  game.value.players.push(createPlayer());
  game.value.players.push(createPlayer());
  game.value.players.push(createPlayer());

  // Start automatic saves
  game.value.canSave = true;
  navigateTo("/players");
}
</script>~/logic/game