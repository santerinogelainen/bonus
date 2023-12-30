<template>
  <div class="container">
    <section class="stats">
      <v-container class="stats-container">
        <v-banner v-if="round.suit !== undefined" density="compact">
          <template #prepend>
            <v-icon :color="round.suit === 'diamond' || round.suit === 'heart' ? 'red' : undefined">
              mdi-cards-{{ round.suit }}
            </v-icon>
          </template>
          <v-banner-text>
            Satunnaisesti valittu valtti
          </v-banner-text>
        </v-banner>
        <round-guess-list
          v-if="state !== RoundState.Deal"
          :highlight-player="state === RoundState.Answer ? answerer?.id : undefined"
          :show-answers="state === RoundState.Answer || state === RoundState.Status"
          :show-totals="state === RoundState.Status"
        />
      </v-container>
    </section>
    <section class="controls">
      <v-container>
        <round-deal v-if="state === RoundState.Deal" />
        <round-guess v-if="state === RoundState.Guess" />
        <round-play v-if="state === RoundState.Play" @continue="() => (answering = true)" />
        <round-answer v-if="state === RoundState.Answer" @back="() => (answering = false)" />
        <round-status v-if="state === RoundState.Status" @continue="() => (answering = false)" />
      </v-container>
    </section>
  </div>
</template>

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
    padding-top: .25em;

    @media only screen and (max-width: 960px) {
      .stats-container {
        padding: 0;
      }
    }
  }

  .controls {
    height: 55%;
    box-shadow: 
      0px -3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 
      0px -2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 
      0px -1px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)) !important;
  }
}
</style>

<script setup lang="ts">
import { answerer } from "~/logic/answer";
import game from "~/logic/game";
import round from "~/logic/round";

enum RoundState {
  Deal,
  Guess,
  Play,
  Answer,
  Status,
}

const answering = ref(false);
const state = computed<RoundState>(() => {
  const guesses = round.value.guesses.length;
  const players = game.value.playerCount;

  if (guesses === 0) {
    return RoundState.Deal;
  }

  if (
    guesses < players ||
    (guesses === players &&
      round.value.guesses.some((x) => x.guess === undefined))
  ) {
    return RoundState.Guess;
  }

  if (
    answering.value &&
    guesses === players &&
    round.value.guesses.some((x) => !x.answered)
  ) {
    return RoundState.Answer;
  }

  if (
    guesses === players &&
    round.value.guesses.every((x) => x.answered && x.guess !== undefined)
  ) {
    return RoundState.Status;
  }

  return RoundState.Play;
});

definePageMeta({title: () => `Kierros ${round.value.id}`});
</script>
