<template>
  <v-table fixed-header height="80vh">
    <thead>
      <tr>
        <th class="text-left" style="border-right: 1px solid #ccc"></th>
        <th
          class="text-center"
          style="border-right: 1px solid #ccc"
          v-for="player in Object.values(game.players)"
          colspan="2"
        >
          <trophy :placement="player.placement" />
          <strong class="ms-2">{{ player.name }}</strong>
        </th>
      </tr>
    </thead>
    <tbody>
      <result-table-row
        v-for="(round, index) in rounds"
        :round="round"
        :key="index"
      />
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import game from "~/logic/game";
import ResultTableRow from "./ResultTableRow.vue";
import Trophy from "../Trophy.vue";
import type { RoundResult } from "~/types";

const props = defineProps<{
  rounds: Array<RoundResult>;
}>();
</script>
