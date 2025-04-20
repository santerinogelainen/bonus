<template>
  <v-container>
    <v-btn
      v-if="game.state !== 'initializing'"
      size="x-large"
      block
      :to="gameRoute"
      class="mt-3"
      rounded="lg"
      color="secondary"
    >
      {{ $t('nav.continueGame') }}
    </v-btn>
    <v-btn
      size="x-large"
      block
      @click="createNewGame"
      class="mt-3"
      rounded="lg"
    >
      {{ $t('game.newGame') }}
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTitle } from "~/composition/useAppTitle";
import game, { newGame, gameRoute } from "~/logic/game";
import { addPlayer } from "~/logic/players";
import { nextState } from "~/logic/state";

const { t } = useI18n()

const createNewGame = () => {
  game.value = newGame();

  // Add 3 players (min)
  addPlayer();
  addPlayer();
  addPlayer();

  // Start automatic saves and go to players
  nextState();
};

useAppTitle(() => t('nav.home'))
</script>
