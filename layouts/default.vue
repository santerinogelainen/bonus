<template>
  <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <Link rel="manifest" href="/site.webmanifest" />

  <v-app>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>
        TODO
      </v-app-bar-title>
      <template v-slot:append>
        <language-switcher />
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list nav>
        <v-list-item prepend-icon="mdi-home" to="/">{{ $t('nav.home') }}</v-list-item>
        <v-list-item
          v-if="game.state !== 'initializing'"
          prepend-icon="mdi-play"
          :to="gameRoute"
        >{{ $t('nav.continueGame') }}</v-list-item>
        <v-list-item
          v-if="game.state !== 'initializing'"
          prepend-icon="mdi-chart-bar"
          to="/results"
        >{{ $t('nav.results') }}</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-progress-circular
        v-if="!loaded"
        indeterminate
        color="primary"
      ></v-progress-circular>
      <slot v-else> </slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import game, { useGameSaver, useGameLoader, gameRoute } from "~/logic/game";
import LanguageSwitcher from "~/components/LanguageSwitcher.vue";

const drawer = ref(false);

// Automatically load and save game to/from local storage
const loaded = useGameLoader();
useGameSaver();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Bonus` : "Bonus";
  },
});
</script>
