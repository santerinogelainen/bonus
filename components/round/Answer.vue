<template>
  <h1>
    <strong>{{ answerer?.name }}</strong>
    sai:
  </h1>
  <v-btn
    v-for="n in options"
    @click="() => answerNumber(n)"
    >{{ n }}</v-btn
  >
</template>

<script setup lang="ts">
import game from '~/logic/game';
import { calculatePlayerPoints, calculatePoints } from '~/logic/points';
import round, { options } from '~/logic/round';

const answer = computed(() => round.value.guesses.find((x) => !x.answered));
const answerer = computed(() =>
  answer.value ? game.value.players[answer.value.playerId] : undefined
);

const answerNumber = (n: number) => {
  if (answer.value && answerer.value) {
    answer.value.answer = n;
    answer.value.points = calculatePoints(answer.value);
    answerer.value.points = calculatePlayerPoints(
      game.value.rounds,
      answerer.value.id
    );
    answer.value.answered = true;
  }
};
</script>
