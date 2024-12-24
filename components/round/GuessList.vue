<template>
  <v-table>
    <tbody>
      <tr v-for="guess in round.guesses.filter(x => x.guess !== undefined)" :class="highlightPlayer === guess.playerId ? 'highlighted-guess' : undefined">
        <td>
          <strong>{{ game.players[guess.playerId].name }}</strong>
        </td>
        <td class="td-auto">
          <guess-result :guess="guess" />
        </td>
        <td v-if="showAnswers" class="td-auto">
          <span>
            <b>{{ game.players[guess.playerId]?.points }}</b>
            <span v-if="guess.points !== undefined">{{ ` (+${guess.points})` }}</span>
          </span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped>
.highlighted-guess {
  background-color: #E3F2FD;
}

.td-auto {
  width: 1%;
  white-space: nowrap;
}
</style>

<script setup lang="ts">
import game from '~/logic/game';
import GuessResult from './GuessResult.vue';
import type { PlayerId, Round } from '~/types';

defineProps<{
  round: Round;
  highlightPlayer?: PlayerId
  showAnswers?: boolean
}>();
</script>