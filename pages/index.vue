<template>
  <v-container>
    <v-btn
      v-if="game.isLoaded"
      size="x-large"
      block
      :to="getContinueGamePath()"
      class="mt-3"
      :rounded="true"
      color="secondary"
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
import game, { newGame, getContinueGamePath } from "~/logic/game";
import { addPlayer } from "~/logic/player";

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

definePageMeta({title: `Etusivu`});
</script>
