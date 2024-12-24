<template>
  <tr>
    <td style="border-right: 1px solid #ccc">
      <strong>{{ round.cards }}</strong>
    </td>
    <template v-for="player in players">
      <td class="text-center">
        <guess-result :guess="round.guesses.get(player.id)" />
      </td>
      <td class="text-center" style="border-right: 1px solid #ccc">
        <b>
          {{ round.guesses.get(player.id)?.points }}
        </b>
      </td>
    </template>
  </tr>
</template>

<script setup lang="ts">
import type { RoundResult } from '~/types';
import GuessResult from '../round/GuessResult.vue';
import game from '~/logic/game';

const props = defineProps<{
  round: RoundResult
}>();

const players = computed(() => Object.values(game.value.players));
</script>
