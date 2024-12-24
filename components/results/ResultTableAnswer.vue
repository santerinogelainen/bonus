<template>
  <span v-if="guess?.answer !== undefined">
    {{ guess?.answer }}/{{ guess?.guess }}
  </span>
</template>

<script setup lang="ts">
import type { RoundGuess } from "~/types";

const props = defineProps<{
  guess?: RoundGuess;
}>();
</script>
