<template>
  <v-list>
    <v-list-item
      v-for="player in game.players.values()"
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
    v-if="game && game.players.size < 8"
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
import { addPlayer } from "~/logic/player";
import { getRandomItem } from "~/logic/utils";

const removePlayer = (id: PlayerId) => {
  if (game.value.players.size <= 3) {
    alert("Pelaajaa ei voida poistaa. Pelissä tulee olla vähintään 3 pelaajaa.")
    return;
  }
  game.value.players.delete(id);
};

const setUnknownPlayers = () => {
  let index = 1;
  game.value.players.forEach((player) => {
    if (!player.name) {
      player.name = `Pelaaja ${index}`
    }
    index++;
  });
}

const continueToGame = () => {
  setUnknownPlayers();
  game.value.rounds.push({
    id: 1,
    cards: 1,
    dealerId: getRandomItem([...game.value.players.values()]).id,
    guesses: []
  })
  navigateTo("/rounds");
}
</script>
~/logic/game~/logic/player