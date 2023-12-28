<template>
  <h1>
    <strong>{{ dealer.name }}</strong>
    jakaa
    <strong>{{ round.cards }}</strong>
    korttia.
  </h1>
  <div class="mt-3">
    <v-btn
      :rounded="true"
      size="x-large"
      color="secondary"
      block
      @click="nextGuesser"
      >Kortit on jaettu</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import round, { dealer, nextGuesser } from "~/logic/round";
</script>
