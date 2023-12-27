<template>
  <h1>Pelatkaa kierros läpi.</h1>
  <v-btn @click="unguessNumber">Takaisin</v-btn>
  <v-btn @click="() => emit('continue')">Tulokset</v-btn>
</template>

<script setup lang="ts">
import { unguessNumber } from '~/logic/guess';
const emit = defineEmits(['continue']);
</script>