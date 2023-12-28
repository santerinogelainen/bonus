<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">
          Pelaaja
        </th>
        <th class="text-left">
          Arvaus
        </th>
        <th class="text-left" v-if="showAnswers">
          Pisteet
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="guess in round.guesses.filter(x => x.guess !== undefined)">
        <td><strong>{{ game.players[guess.playerId]?.name }}</strong></td>
        <td>
          <span v-if="showAnswers && guess.answer !== undefined">
            {{ guess.answer }}/{{ guess.guess }}
          </span>
          <span v-else>
            {{ guess.guess }}
          </span>
        </td>
        <td v-if="showAnswers">
          <span v-if="guess.points !== undefined">
            {{ game.players[guess.playerId]?.points }}
            {{ ` (+${guess.points})` }}
          </span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import game from '~/logic/game';
import round from '~/logic/round';

defineProps<{
  showAnswers?: boolean
}>();
</script>