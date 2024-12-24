<template>
  <h1>
    <strong>{{ dealer.name }}</strong>
    jakaa
    <strong>{{ round.cards }}</strong>
    korttia.
  </h1>
  <div class="mt-3">
    <v-btn
      rounded="lg"
      size="x-large"
      color="secondary"
      block
      @click="nextState"
      >Kortit on jaettu</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import round, { dealer } from "~/logic/round";
import { nextState } from "~/logic/state";
</script>
