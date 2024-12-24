<template>
  <div class="options mt-3">
    <v-btn
      v-for="n in options"
      :disabled="isDisabled?.(n)"
      @click="() => emit('click', n)" 
      size="x-large"
      color="secondary"
      :rounded="true"
      >{{ n }}</v-btn>
  </div>
</template>

<style lang="scss" scoped>
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;

  button {
    width: 30%;

    @media only screen and (min-width: 960px) {
      width: auto;
    }
  }
}
</style>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', option: number): void
}>();

defineProps<{
  options: number[],
  isDisabled?: (options: number) => boolean
}>()
</script>