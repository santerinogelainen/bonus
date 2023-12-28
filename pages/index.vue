<template>
  <v-container>
    <v-btn
      size="x-large"
      block
      @click="continueGame"
      class="mt-3"
      :rounded="true"
      color="secondary"
      v-if="game.isLoaded"
      >Jatka peliä</v-btn
    >
    <v-btn
      size="x-large"
      block
      @click="createNewGame"
      class="mt-3"
      :rounded="true"
      >Uusi peli</v-btn
    >
  </v-container>
</template>

<script setup lang="ts">
import game, { newGame } from "~/logic/game";
import { addPlayer } from "~/logic/player";

const continueGame = () => {
  if (game.value.isFinished) {
    navigateTo("/finished");
  } else if (game.value.rounds.length > 0) {
    navigateTo("/rounds");
  } else {
    navigateTo("/players");
  }
};

const createNewGame = () => {
  game.value = newGame();

  // Add 3 players (min)
  addPlayer();
  addPlayer();
  addPlayer();

  // Start automatic saves
  game.value.isLoaded = true;
  navigateTo("/players");
};

useHead({
  title: `Etusivu - Bonus`,
});
</script>
