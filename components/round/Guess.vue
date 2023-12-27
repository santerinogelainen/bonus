<template>
  <h1>
    <strong>{{ guesser?.name }}</strong>
    arvaa:
  </h1>
  <v-btn
    v-for="n in options"
    @click="() => guessNumber(n)"
    >{{ n }}</v-btn
  >
</template>

<script setup lang="ts">
import game from '~/logic/game';
import round, { nextGuesser, options } from '~/logic/round';

const guess = computed(() => round.value.guesses.at(-1));
const guesser = computed(() =>
  guess.value ? game.value.players[guess.value.playerId] : undefined
);

const guessNumber = (n: number) => {
  if (guess.value) {
    guess.value.guess = n;
  }
  nextGuesser();
};
</script>
