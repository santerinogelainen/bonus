<template>
  <h1>
      <strong>{{ dealer.name }}</strong>
      jakaa
      <strong>{{ round.cards }}</strong>
      korttia.
    </h1>
    <v-btn @click="nextGuesser">Kortit on jaettu</v-btn>
</template>

<script setup lang="ts">
import round, { dealer, nextGuesser } from '~/logic/round';
</script>