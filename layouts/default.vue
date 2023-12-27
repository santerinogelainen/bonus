<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Bonus</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-progress-circular
          v-if="!loaded"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <slot v-else> </slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGameSaver, useGameLoader } from '~/logic/game';

// Automatically load and save game to/from local storage
const loaded = useGameLoader();
useGameSaver();
</script>