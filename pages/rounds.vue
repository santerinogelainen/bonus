<template>
  <round-guess-list
    v-if="state !== RoundState.Deal"
    :show-answers="state === RoundState.Answer || state === RoundState.Status"
    :show-totals="state === RoundState.Status"
  />
  <round-deal v-if="state === RoundState.Deal" />
  <round-guess v-if="state === RoundState.Guess" />
  <round-play v-if="state === RoundState.Play" @continue="() => (answering = true)" />
  <round-answer v-if="state === RoundState.Answer" />
  <round-status v-if="state === RoundState.Status" @continue="() => (answering = false)" />
</template>

<script setup lang="ts">
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

useHead({
  title: `Kierros ${round.value.id} - Bonus`
});

</script>
