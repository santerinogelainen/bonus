<template>
  <v-table density="compact" fixed-header height="80vh">
    <thead>
      <tr>
        <th class="text-left" style="border-right: 1px solid #ccc">
          Kierros
        </th>
        <th class="text-center" style="border-right: 1px solid #ccc" v-for="player in Object.values(game.players)" colspan="2">
          <strong>{{ player.name }}</strong>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="round in getData()">
        <td style="border-right: 1px solid #ccc"><strong>{{ round.cards }}</strong></td>
        <template v-for="player in Object.values(game.players)">
          <td class="text-center">
            <span v-if="round.guesses.get(player.id)?.answer !== undefined">
              {{ round.guesses.get(player.id)?.answer }}/{{ round.guesses.get(player.id)?.guess }}
            </span>
          </td>
          <td class="text-center" style="border-right: 1px solid #ccc">
            {{ round.guesses.get(player.id)?.points }}
          </td>
        </template>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import game from '~/logic/game';

const getData = () => {
  const data = new Array<{
    cards: number,
    guesses: Map<PlayerId, RoundGuess>
  }>();

  game.value.rounds.forEach(round => {
    const item = {
      cards: round.cards,
      guesses: new Map<PlayerId, RoundGuess>()
    };
    const prevItem = data.at(-1);

    round.guesses.forEach(guess => {
      item.guesses.set(guess.playerId, {
        ...guess,
        points: guess.points == undefined ? undefined : (prevItem?.guesses.get(guess.playerId)?.points ?? 0) + (guess.points ?? 0)
      })
    });

    data.push(item);
  });

  return data;
}

useHead({
  title: `Tulokset - Bonus`
});
</script>