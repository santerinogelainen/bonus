<template>
  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-title>Bonus</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <slot> </slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGameSaver, useGameLoader } from '~/game';

// Automatically load and save game to/from local storage
useGameLoader();
useGameSaver();
</script>
