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
          Tulos
        </th>
        <th class="text-left" v-if="showAnswers">
          Pisteet (kierros)
        </th>
        <th class="text-left" v-if="showTotals">
          Pisteet (yht.)
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="guess in round.guesses" v-show="guess.playerId !== ignorePlayer">
        <td><strong>{{ getPlayer(guess.playerId).name }}</strong></td>
        <td>{{ guess.guess }}</td>
        <td v-if="showAnswers">{{ guess.answer }}</td>
        <td v-if="showAnswers">
          <span v-if="calculatePoints(guess) !== undefined">
            {{ `+${calculatePoints(guess)} pistettä` }}
          </span>
        </td>
        <td v-if="showTotals">
          {{ totals.get(guess.playerId)?.points }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import game from '~/logic/game';
import { calculatePoints, useTotals } from '~/logic/points';

const totals = useTotals();

defineProps<{
  round: Round,
  ignorePlayer?: PlayerId,
  showAnswers?: boolean,
  showTotals?: boolean
}>();

const getPlayer = (id: string) => game.value.players.get(id)!;
</script>