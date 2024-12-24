<template>
  <h1>Pelatkaa kierros läpi.</h1>
  
  <div class="mt-3">
    <v-btn
      :rounded="true"
      size="x-large"
      color="secondary"
      block
      @click="nextState"
      >Tulokset</v-btn
    >
  </div>
  <round-back @click="unguessNumber" />
</template>

<script setup lang="ts">
import { unguessNumber } from "~/logic/guess";
import { nextState } from "~/logic/state";
</script>
