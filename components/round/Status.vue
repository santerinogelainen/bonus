<template>
  <h1>
    Tulokset
  </h1>
  <div class="mt-3">
    <v-btn
      :rounded="true"
      size="x-large"
      color="secondary"
      block
      @click="nextRound"
      >Seuraava kierros</v-btn
    >
  </div>
  <round-back @click="unanswerNumber" />
</template>

<script setup lang="ts">
import { unanswerNumber } from "~/logic/answer";
import game from "~/logic/game";
import { getNextRound } from "~/logic/round";

const emit = defineEmits(["continue"]);

const nextRound = () => {
  const nextRound = getNextRound();

  if (!nextRound) {
    game.value.isFinished = true;
    navigateTo("/finished");
    return;
  }

  game.value.rounds.push(nextRound);
  emit("continue");
};
</script>
