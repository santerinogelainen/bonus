<template>
  <v-list>
    <v-list-item
      v-for="player in game.players"
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
    v-if="game && game.players.length < 8"
    variant="text"
    @click="addPlayer"
    >Lisää pelaaja</v-btn
  >
</template>

<script setup lang="ts">
import game from "~/logic/game";
import { createPlayer } from "~/logic/player";

const removePlayer = (id: PlayerId) => {
  if (game.value.players.length <= 3) {
    alert("Pelaajaa ei voida poistaa. Pelissä tulee olla vähintään 3 pelaajaa.")
    return;
  }
  game.value.players = game.value.players.filter((x) => x.id !== id);
};

const addPlayer = () => {
  game.value.players.push(createPlayer());
};
</script>
~/logic/game~/logic/player