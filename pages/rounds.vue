<template>
  <guess-list
    v-if="state !== RoundState.Deal"
    :ignore-player="state === RoundState.Guess ? guesser?.id : undefined"
    :round="round"
    :show-answers="state === RoundState.Answer || state === RoundState.Status"
    :show-totals="state === RoundState.Status"
  />
  <div v-if="state === RoundState.Deal">
    <h1>
      <strong>{{ dealer.name }}</strong>
      jakaa
      <strong>{{ round.cards }}</strong>
      korttia.
    </h1>
    <v-btn @click="nextGuesser">Kortit on jaettu</v-btn>
  </div>
  <div v-if="state === RoundState.Guess">
    <h1>
      <strong>{{ guesser?.name }}</strong>
      arvaa:
    </h1>
    <v-btn
      v-for="n in numbers"
      @click="() => guessNumber(n)"
      >{{ n }}</v-btn
    >
  </div>
  <div v-if="state === RoundState.Play">
    <h1>Pelatkaa kierros läpi.</h1>
    <v-btn @click="() => (answering = true)">Tulokset</v-btn>
  </div>
  <div v-if="state === RoundState.Answer">
    <h1>
      <strong>{{ answerer?.name }}</strong>
      sai:
    </h1>
    <v-btn
      v-for="n in numbers"
      @click="() => answerNumber(n)"
      >{{ n }}</v-btn
    >
  </div>
  <div v-if="state === RoundState.Status">
    <h1>Pistetilanne</h1>
    <v-btn @click="nextRound">Seuraava kierros</v-btn>
  </div>
</template>

<script setup lang="ts">
import game from "~/logic/game";
import { getNextPlayer } from "~/logic/player";
import { calculatePlayerPoints, calculatePoints } from "~/logic/points";
import round, { dealer, getNextRound } from "~/logic/round";

enum RoundState {
  Deal,
  Guess,
  Play,
  Answer,
  Status,
}

const guess = computed(() => round.value.guesses.at(-1));
const guesser = computed(() =>
  guess.value ? game.value.players.get(guess.value.playerId) : undefined
);
const answer = computed(() => round.value.guesses.find((x) => !x.answered));
const answerer = computed(() =>
  answer.value ? game.value.players.get(answer.value.playerId) : undefined
);
const numbers = computed(() => [...Array(round.value.cards + 1).keys()]);
const answering = ref(false);

const state = computed<RoundState>(() => {
  const guesses = round.value.guesses.length;
  const players = game.value.players.size;

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
    round.value.guesses.every(
      (x) => x.answered && x.guess !== undefined
    )
  ) {
    return RoundState.Status;
  }

  return RoundState.Play;
});

const guessNumber = (n: number) => {
  if (guess.value) {
    guess.value.guess = n;
  }
  nextGuesser();
};

const answerNumber = (n: number) => {
  if (answer.value && answerer.value) {
    answer.value.answer = n;
    answer.value.points = calculatePoints(answer.value);
    answerer.value.points = calculatePlayerPoints(game.value.rounds, answerer.value.id);
    answer.value.answered = true;
  }
};

const nextGuesser = () => {
  if (round.value.guesses.length === game.value.players.size) {
    return;
  }
  const currentGuesserId = guess.value?.playerId || round.value.dealerId;
  const nextGuesser = getNextPlayer(currentGuesserId);
  round.value.guesses.push({
    playerId: nextGuesser.id,
    guess: undefined,
    answer: undefined,
    answered: false,
  });
};

const nextRound = () => {
  const nextRound = getNextRound();

  if (!nextRound) {
    navigateTo("/finished");
    return;
  }

  game.value.rounds.push(nextRound);
  answering.value = false;
};
</script>
