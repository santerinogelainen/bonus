<template>
  <v-btn @click="createNewGame">Uusi peli</v-btn>
</template>

<script setup lang="ts">
import game from '~/game';

const createNewGame = () => {
  game.value = {
    players: [],
    rounds: []
  };

  navigateTo("/players");
}
</script>