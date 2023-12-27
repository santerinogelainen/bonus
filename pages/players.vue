<template>
  <v-list>
    <v-list-item
      v-for="player in Object.values(game.players)"
      :key="player.id"
    >
      <v-text-field
        v-model="player.name"
        label="Anna pelaajan nimi"
        append-icon="mdi-window-close"
        @click:append="() => removePlayer(player.id)"
      ></v-text-field>
    </v-list-item>
  </v-list>
  <v-btn
    v-if="game && game.playerCount < maxPlayers"
    variant="text"
    @click="addPlayer"
    >Lisää pelaaja</v-btn
  >
  <v-btn @click="continueToGame">
    Jatka
  </v-btn>
</template>

<script setup lang="ts">
import game from "~/logic/game";
import { addPlayer, removePlayer, maxPlayers } from "~/logic/player";
import { getFirstRound } from "~/logic/round";

const setUnknownPlayers = () => {
  let index = 1;
  Object.values(game.value.players).forEach((player) => {
    if (!player.name) {
      player.name = `Pelaaja ${index}`
    }
    index++;
  });
}

const continueToGame = () => {
  setUnknownPlayers();
  game.value.rounds.push(getFirstRound())
  navigateTo("/rounds");
}

useHead({
  title: `Pelaajat - Bonus`
});
</script>