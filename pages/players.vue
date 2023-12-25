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
import game from "~/game";
import { v4 as uuidv4 } from "uuid";

const removePlayer = (id: PlayerId) => {
  game.value.players = game.value.players.filter((x) => x.id !== id);
};

const addPlayer = () => {
  game.value.players.push({
    id: uuidv4(),
    name: "",
  });
};
</script>
