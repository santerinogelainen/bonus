<template>
  <result-table :rounds="data" />
</template>

<script setup lang="ts">
import game from "~/logic/game";
import type { PlayerId, RoundGuess, RoundResult } from "~/types";
import ResultTable from "~/components/results/ResultTable.vue";

const { t } = useI18n()

const data = computed(() => {
  const result = new Array<RoundResult>();

  game.value.rounds.map((round) => {
    const item = {
      cards: round.cards,
      guesses: new Map<PlayerId, RoundGuess>(),
    };
    const prevItem = result.at(-1);

    round.guesses.forEach((guess) => {
      item.guesses.set(guess.playerId, {
        ...guess,
        points:
          guess.points == undefined
            ? undefined
            : (prevItem?.guesses.get(guess.playerId)?.points ?? 0) +
              (guess.points ?? 0),
      });
    });

    result.push(item);
  });

  return result;
});

useHead({
  title: computed(() => t('nav.results'))
});
</script>
