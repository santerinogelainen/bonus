<template>
  <h1>
    <strong>{{ answerer?.name }}</strong>
    sai:
  </h1>
  <v-btn @click="onBack">Takaisin</v-btn>
  <v-btn
    v-for="n in options"
    @click="() => answerNumber(n)"
    >{{ n }}</v-btn
  >
</template>

<script setup lang="ts">
import { options } from '~/logic/round';
import { answerer, answerNumber, unanswerNumber } from '~/logic/answer';

const emit = defineEmits(['back']);

const onBack = () => {
  if (!unanswerNumber()) {
    emit('back');
  }
}
</script>
