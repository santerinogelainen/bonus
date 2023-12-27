<template>
  <h1>
    <strong>{{ guesser?.name }}</strong>
    arvaa:
  </h1>
  <v-btn @click="unguessNumber">Takaisin</v-btn>
  <v-btn
    v-for="n in options"
    @click="() => guessNumber(n)"
    >{{ n }}</v-btn
  >
</template>

<script setup lang="ts">
import { guesser, guessNumber, unguessNumber } from '~/logic/guess';
import { options } from '~/logic/round';
</script>
