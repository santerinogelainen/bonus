<template>
  <v-btn @click="unanswerNumber">Takaisin</v-btn>
  <v-btn @click="nextRound">Seuraava kierros</v-btn>
</template>

<script setup lang="ts">
import { unanswerNumber } from '~/logic/answer';
import game from '~/logic/game';
import { getNextRound } from '~/logic/round';

const emit = defineEmits(['continue']);

const nextRound = () => {
  const nextRound = getNextRound();

  if (!nextRound) {
    navigateTo("/finished");
    return;
  }

  game.value.rounds.push(nextRound);
  emit("continue");
};
</script>