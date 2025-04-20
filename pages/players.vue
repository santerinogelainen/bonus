<template>
  <v-list>
    <v-list-item v-for="player in Object.values(game.players)" :key="player.id">
      <v-text-field
        v-model="player.name"
        :label="$t('players.enterName')"
        append-icon="mdi-window-close"
        @click:append="() => removePlayer(player.id)"
        :hide-details="true"
      ></v-text-field>
    </v-list-item>
  </v-list>
  <v-container>
    <div class="mb-5">
      <v-btn
        v-if="game && game.playerCount < maxPlayers"
        @click="addPlayer"
        block
        rounded="lg"
        prepend-icon="mdi-plus"
      >
        {{ $t('players.addPlayer') }}
      </v-btn>
    </div>
    <v-btn
      size="x-large"
      rounded="lg"
      block
      color="secondary"
      @click="nextState"
    >
      {{ $t('nav.continue') }}
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTitle } from "~/composition/useAppTitle";
import game from "~/logic/game";
import { addPlayer, removePlayer, maxPlayers } from "~/logic/players";
import { nextState } from "~/logic/state";

const { t } = useI18n();

useAppTitle(() => t('nav.players'));
</script>
