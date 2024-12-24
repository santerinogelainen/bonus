<template>
  <v-icon :large="large" :color="color">
    {{ icon }}
  </v-icon>
</template>

<script setup lang="ts">
const props = defineProps<{
  placement: number;
  large?: boolean;
  number?: boolean;
}>();

const icons = ["mdi-trophy", "mdi-trophy-outline", "mdi-trophy-outline"];
const colors = ["#ccad00", "#969696", "#b54a14"];

const icon = computed(() =>
  props.number
    ? `mdi-numeric-${props.placement+1}`
    : icons.at(props.placement) || `mdi-numeric-${props.placement+1}`
);
const color = computed(() => colors.at(props.placement));
</script>
