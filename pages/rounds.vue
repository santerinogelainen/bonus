<template>
  <div class="container">
    <section class="stats">
      <v-container class="stats-container">
        <round-trump-card />
        <round-guess-list
          :round="listRound"
          :highlight-player="state === 'answer' ? answerer?.id : undefined"
          :show-answers="state === 'answer' || state === 'deal'"
        />
      </v-container>
    </section>
    <section class="controls">
      <v-container>
        <round-deal v-if="state === 'deal'" />
        <round-guess v-if="state === 'guess'" />
        <round-play v-if="state === 'play'" />
        <round-answer v-if="state === 'answer'" />
        <round-back />
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAppTitle } from "~/composition/useAppTitle";
import { answerer } from "~/logic/answer";
import game from "~/logic/game";
import round from "~/logic/round";
import state from "~/logic/state";

const { t } = useI18n()

const listRound = computed(() =>
  state.value === "deal" ? game.value.rounds.at(-2) || round.value : round.value
);

useAppTitle(() => t('game.roundNumber', { number: round.value.id }));
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 85vh;

  section {
    overflow-y: auto;
  }

  .stats {
    height: 45%;
    padding-top: 0.25em;

    @media only screen and (max-width: 960px) {
      .stats-container {
        padding: 0;
      }
    }
  }

  .controls {
    height: 55%;
    box-shadow: 0px -3px 1px -2px
        var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
      0px -2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
      0px -1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
  }
}
</style>
