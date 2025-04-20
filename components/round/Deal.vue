<template>
  <h1>
    <strong>{{ dealer.name }}</strong>
    {{ $t('game.deals') }}
    <strong>{{ round.cards }}</strong>
    {{ $t('game.cards') }}
  </h1>
  <div class="mt-3">
    <v-btn
      rounded="lg"
      size="x-large"
      color="secondary"
      block
      @click="nextState"
    >
      {{ $t('game.cardsDealt') }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import round, { dealer } from "~/logic/round";
import { nextState } from "~/logic/state";
</script>
