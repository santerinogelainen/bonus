<template>
  <h1>Pelatkaa kierros läpi.</h1>
  <v-btn @click="() => emit('continue')">Tulokset</v-btn>
</template>

<script setup lang="ts">
const emit = defineEmits(['continue']);
</script>