<template>
  <h1>
    <strong>{{ guesser?.name }}</strong>
    arvaa:
  </h1>
  <round-keyboard
    :options="options"
    :is-disabled="isDisabled"
    @click="onGuess"
  />
  <round-back @click="unguessNumber" />
</template>

<script setup lang="ts">
import game from "~/logic/game";
import { guesser, guessNumber, unguessNumber } from "~/logic/guess";
import round, { options } from "~/logic/round";
import { nextState } from "~/logic/state";
import { getSum } from "~/logic/utils";

const isDisabled = (option: number) => {
  // last player is guessing and more than 4 cards are in play
  if (
    round.value.guesses.length === game.value.playerCount &&
    round.value.cards >= 4
  ) {
    // this is to guarantee that someone guesses incorrectly
    const sum = getSum(round.value.guesses, "guess");
    const diff = round.value.cards - sum;
    return diff === option;
  }
  return false;
};

const onGuess = (n: number) => {
  guessNumber(n);
  nextState();
};
</script>
