<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="player, i in results"
        :title="player.name"
        :subtitle="`${player.points} pistettä`"
      >
        <template #prepend>
          <v-icon large color="#ccad00" v-if="i === 0">mdi-trophy</v-icon>
          <v-icon large color="#969696" v-if="i === 1">mdi-trophy-outline</v-icon>
          <v-icon large color="#b54a14" v-if="i === 2">mdi-trophy-outline</v-icon>
          <v-icon large v-if="i >= 3">mdi-numeric-{{ i }}</v-icon>
        </template>
      </v-list-item>
    </v-list>
    <div class="mt-2">
      <v-btn
        :rounded="true"
        size="x-large"
        color="secondary"
        block
        to="/results"
        >Näytä kierrokset</v-btn
      >
      <v-btn
        size="x-large"
        block
        to="/"
        class="mt-3"
        :rounded="true"
        >Takaisin etusivulle</v-btn
      >
    </div>
  </v-container>
</template>

<script setup lang="ts">
import game from "~/logic/game";
import { sortBy } from "~/logic/utils";

const results = computed(() =>
  sortBy(Object.values(game.value.players), "points").reverse()
);

definePageMeta({ title: `Tulokset` });
</script>
