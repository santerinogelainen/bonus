<template>
  <v-btn
    variant="text"
    density="compact"
    @click="() => emit('click')"
    prepend-icon="mdi-arrow-left"
    class="back-button"
    >Takaisin</v-btn
  >
</template>

<style lang="scss" scoped>
.back-button {
  margin-top: 2em;
}
</style>

<script setup lang="ts">
const emit = defineEmits(["click"]);
</script>
