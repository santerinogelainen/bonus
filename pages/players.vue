<template>
  <v-list>
    <v-list-item v-for="player in Object.values(game.players)" :key="player.id">
      <v-text-field
        v-model="player.name"
        label="Anna pelaajan nimi"
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
        :rounded="true"
        prepend-icon="mdi-plus"
        >Lisää pelaaja</v-btn
      >
    </div>
    <v-btn
      size="x-large"
      :rounded="true"
      block
      color="secondary"
      @click="nextState"
    >
      Jatka
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import game from "~/logic/game";
import { addPlayer, removePlayer, maxPlayers } from "~/logic/players";
import { nextState } from "~/logic/state";


definePageMeta({ title: `Pelaajat` });
</script>
