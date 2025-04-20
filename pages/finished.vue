<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="player, i in results"
        :title="player.name"
        :subtitle="$t('game.pointsCount', { count: player.points })"
      >
        <template #prepend>
          <trophy :placement="i" large />
        </template>
      </v-list-item>
    </v-list>
    <div class="mt-2">
      <v-btn
        rounded="lg"
        size="x-large"
        color="secondary"
        block
        to="/results"
      >
        {{ $t('game.showRounds') }}
      </v-btn>
      <v-btn
        size="x-large"
        block
        to="/"
        class="mt-3"
        rounded="lg"
      >
        {{ $t('nav.backToHome') }}
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import game from "~/logic/game";
import Trophy from "~/components/Trophy.vue";
import { sortBy } from "~/logic/utils";

const { t } = useI18n()

const results = computed(() =>
  sortBy(Object.values(game.value.players), "points").reverse()
);

useHead({
  title: computed(() => t('game.finalResults'))
});
</script>
