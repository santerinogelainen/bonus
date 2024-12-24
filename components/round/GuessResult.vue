<template>
  <span class="guess-result" v-if="guess?.answer !== undefined || guess?.guess !== undefined">
    <v-chip :color="color" :append-icon="icon">
      <span v-if="guess?.answer !== undefined">{{ guess?.answer }}/</span>
      {{ guess?.guess }}
    </v-chip>
  </span>
</template>

<script setup lang="ts">
import type { RoundGuess } from "~/types";
import { VChip } from "vuetify/components";

const color = computed(() => {
  if (props.guess?.answer === undefined) {
    return undefined;
  }

  return props.guess?.answer === props.guess.guess ? "green" : "red";
});

const icon = computed(() => {
  if (props.guess?.answer === undefined) {
    return undefined;
  }

  return props.guess?.answer === props.guess.guess ? "mdi-check" : "mdi-close";
});

const props = defineProps<{
  guess?: RoundGuess;
}>();
</script>
