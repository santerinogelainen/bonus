<template>
  <h1>
    <strong>{{ answerer?.name }}</strong>
    {{ $t('game.got') }}
  </h1>
  <round-keyboard :options="possibleOptions" @click="onAnswer" />
</template>

<script setup lang="ts">
import round, { options } from "~/logic/round";
import { answerer, answerNumber } from "~/logic/answer";
import { getSum } from "~/logic/utils";
import { nextState } from "~/logic/state";

const onAnswer = (n: number) => {
  answerNumber(n);
  nextState();
};

const possibleOptions = computed(() => {
  const sum = getSum(round.value.guesses, "answer");
  const isLast = round.value.guesses.every(
    (x) => x.answered || x.playerId === answerer.value?.id
  );
  const cardsLeft = round.value.cards - sum;
  return options.value.filter((option) => {
    if (isLast) {
      return option === cardsLeft;
    }
    return option <= cardsLeft;
  });
});
</script>
