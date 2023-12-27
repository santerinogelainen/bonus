<template>
  <h1>
    <strong>{{ guesser?.name }}</strong>
    arvaa:
  </h1>
  <v-btn @click="unguessNumber">Takaisin</v-btn>
  <v-btn
    v-for="n in options"
    :disabled="isDisabled(n)"
    @click="() => guessNumber(n)"
    >{{ n }}</v-btn
  >
</template>

<script setup lang="ts">
import game from '~/logic/game';
import { guesser, guessNumber, unguessNumber } from '~/logic/guess';
import round, { options } from '~/logic/round';

const isDisabled = (option: number) => {
  // last player is guessing and more than 4 cards are in play
  if (round.value.guesses.length === game.value.playerCount && round.value.cards >= 4) {
    // this is to guarantee that someone guesses incorrectly
    const sum = round.value.guesses.reduce<number>((total, guess) => total + (guess.guess ?? 0), 0);
    const diff = round.value.cards - sum;
    return diff === option;
  }
  return false;
}
</script>
