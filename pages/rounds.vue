<template>
  <div v-if="!guess">
    <h1>
      <strong>{{ dealer.name }}</strong>
      jakaa 
      <strong>{{ round.cards }}</strong>
      korttia.
    </h1>
    <v-btn @click="goNextGuesser">Kortit on jaettu</v-btn>
  </div>
  <div v-if="guess && guesser">
    <h1>
      <strong>{{ guesser.name }}</strong>
      arvaa:
    </h1>
  </div>
</template>

<script setup lang="ts">
import game from '~/logic/game';

const round = computed(() => game.value.rounds.at(-1)!);
const dealer = computed(() => game.value.players.get(round.value.dealerId)!);
const guess = computed(() => round.value.guesses.at(-1));
const guesser = computed(() => guess.value ? game.value.players.get(guess.value.playerId) : undefined)

const goNextGuesser = () => {
  const players = [...game.value.players.values()];
  const currentGuesserId = guess.value?.playerId || round.value.dealerId;
  const nextGuesserIndex = players.findIndex(x => x.id === currentGuesserId) + 1;
  const nextGuesser = players[nextGuesserIndex] || players[0];
  round.value.guesses.push({
    playerId: nextGuesser.id,
    guess: undefined,
    answer: undefined
  })
}
</script>