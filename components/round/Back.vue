<template>
  <v-btn
    variant="text"
    density="compact"
    @click="previousState"
    prepend-icon="mdi-arrow-left"
    class="back-button"
  >
    {{ $t('game.back') }}
  </v-btn>
</template>

<style lang="scss" scoped>
.back-button {
  margin-top: 2em;
}
</style>

<script setup lang="ts">
import { previousState } from '~/logic/state';
</script>
