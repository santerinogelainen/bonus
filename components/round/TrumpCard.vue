<template>
  <v-banner v-if="round.suit !== undefined" density="compact">
    <template #prepend>
      <v-icon :color="color"> mdi-cards-{{ round.suit }} </v-icon>
    </template>
    <v-banner-text>{{ $t('game.randomlySelectedTrump') }}</v-banner-text>
  </v-banner>
</template>

<script setup lang="ts">
import round from "~/logic/round";

const color = computed(() =>
  round.value.suit === "diamond" || round.value.suit === "heart"
    ? "red"
    : undefined
);
</script>
