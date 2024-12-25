<template>
  <h1 v-if="starterPlayer?.name">{{ `${starterPlayer?.name} aloitaa.` }} Pelatkaa kierros läpi.</h1>
  <h1 v-else>Pelatkaa kierros läpi.</h1>
  
  <div class="mt-3">
    <v-btn
      rounded="lg"
      size="x-large"
      color="secondary"
      block
      @click="nextState"
      >Tulokset</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import game from "~/logic/game";
import round from "~/logic/round";
import { nextState } from "~/logic/state";

const starterPlayerId = computed(() => round.value.guesses.at(0)?.playerId)
const starterPlayer = computed(() => game.value.players[starterPlayerId.value || ''])
</script>
