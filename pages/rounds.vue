<template>
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
    <v-btn v-for="n in numbers" @click="() => guessNumber(n)">{{ n }}</v-btn>
  </div>
  <div v-if="state === RoundState.Play">
    <h1>
      Pelatkaa kierros läpi. (TODO: arvaukset...)
    </h1>
    <v-btn @click="() => answering = true">Tulokset</v-btn>
  </div>
  <div v-if="state === RoundState.Answer">
    <h1>
      <strong>{{ answerer?.name }}</strong>
      sai:
    </h1>
    <v-btn v-for="n in numbers" @click="() => answerNumber(n)">{{ n }}</v-btn>
  </div>
  <div v-if="state === RoundState.Status">
    <h1>
      Pistetilanne
    </h1>
    <v-btn @click="nextRound">Seuraava kierros</v-btn>
  </div>
</template>

<script setup lang="ts">
import game from '~/logic/game';

enum RoundState {
  Deal,
  Guess,
  Play,
  Answer,
  Status
}

const round = computed(() => game.value.rounds.at(-1)!);
const dealer = computed(() => game.value.players.get(round.value.dealerId)!);
const guess = computed(() => round.value.guesses.at(-1));
const guesser = computed(() => guess.value ? game.value.players.get(guess.value.playerId) : undefined);
const answer = computed(() => round.value.guesses.find(x => x.answer === undefined));
const answerer = computed(() => answer.value ? game.value.players.get(answer.value.playerId) : undefined);
const numbers = computed(() => [...Array(round.value.cards + 1).keys()]);
const answering = ref(false);

const state = computed<RoundState>(() => {
  const guesses = round.value.guesses.length;
  const players = game.value.players.size;

  if (guesses === 0) {
    return RoundState.Deal;
  }

  if (guesses < players || (guesses === players && round.value.guesses.some(x => x.guess === undefined))) {
    return RoundState.Guess;
  }

  if (answering.value && guesses === players && round.value.guesses.some(x => x.answer === undefined)) {
    return RoundState.Answer;
  }

  if (guesses === players && round.value.guesses.every(x => x.answer !== undefined && x.guess !== undefined)) {
    return RoundState.Status;
  }

  return RoundState.Play;
});

const guessNumber = (n: number) => {
  if (guess.value) {
    guess.value.guess = n;
  }
  nextGuesser();
}

const answerNumber = (n: number) => {
  if (answer.value) {
    answer.value.answer = n;
  }
}

const getNextPlayer = (currentId: string) => {
  const players = [...game.value.players.values()];
  const nextGuesserIndex = players.findIndex(x => x.id === currentId) + 1;
  return players[nextGuesserIndex] || players[0];
}

const nextGuesser = () => {
  if (round.value.guesses.length === game.value.players.size) {
    return;
  }
  const currentGuesserId = guess.value?.playerId || round.value.dealerId;
  const nextGuesser = getNextPlayer(currentGuesserId);
  round.value.guesses.push({
    playerId: nextGuesser.id,
    guess: undefined,
    answer: undefined
  })
}

const nextRound = () => {
  game.value.rounds.push({
    id: round.value.id + 1,
    cards: round.value.cards + 1,
    guesses: [],
    dealerId: getNextPlayer(round.value.dealerId).id
  })
  answering.value = false;
}
</script>