<template>
  <v-table density="compact">
    <tbody>
      <tr v-for="guess in round.guesses.filter(x => x.guess !== undefined)" :class="highlightPlayer === guess.playerId ? 'highlighted-guess' : undefined">
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

<style lang="scss" scoped>
.highlighted-guess {
  background-color: #eee;
}
</style>

<script setup lang="ts">
import game from '~/logic/game';
import round from '~/logic/round';

defineProps<{
  highlightPlayer?: PlayerId
  showAnswers?: boolean
}>();
</script>