<template>
  <h1>
    <strong>{{ answerer?.name }}</strong>
    sai:
  </h1>
  <round-keyboard :options="possibleOptions" @click="onAnswer" />
  <round-back @click="onBack" />
</template>

<script setup lang="ts">
import round, { options } from "~/logic/round";
import { answerer, answerNumber, unanswerNumber } from "~/logic/answer";
import { getSum } from "~/logic/utils";
import { nextState } from "~/logic/state";

const emit = defineEmits(["back"]);

const onBack = () => {
  if (!unanswerNumber()) {
    emit("back");
  }
};

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
