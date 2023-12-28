<template>
  <h1>
    <strong>{{ answerer?.name }}</strong>
    sai:
  </h1>
  <v-btn @click="onBack">Takaisin</v-btn>
  <v-btn
    v-for="n in possibleOptions"
    @click="() => answerNumber(n)"
    >{{ n }}</v-btn
  >
</template>

<script setup lang="ts">
import round, { options } from '~/logic/round';
import { answerer, answerNumber, unanswerNumber } from '~/logic/answer';
import { getSum } from '~/logic/utils';

const emit = defineEmits(['back']);

const onBack = () => {
  if (!unanswerNumber()) {
    emit('back');
  }
}

const possibleOptions = computed(() => {
  const sum = getSum(round.value.guesses, "answer");
  const isLast = round.value.guesses.every(x => x.answered || x.playerId === answerer.value?.id);
  const cardsLeft = round.value.cards - sum;
  return options.value.filter((option) => {
    if (isLast) {
      return option === cardsLeft;
    }
    return option <= cardsLeft;
  });
});
</script>
