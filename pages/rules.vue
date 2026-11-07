<template>
  <v-container class="py-6">
    <v-card class="mx-auto" max-width="900">
      <v-card-title class="text-h4">
        {{ $t('rules.title') }}
      </v-card-title>

      <v-card-text>
        <p class="mb-4">
          {{ $t('rules.intro') }}
        </p>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.goalTitle') }}
        </h2>
        <p class="mb-4">
          {{ $t('rules.goalText') }}
        </p>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.setupTitle') }}
        </h2>
        <p class="mb-2">
          {{ $t('rules.setupText') }}
        </p>
        <ul class="mb-4 ps-6">
          <li v-for="(item, index) in $tm('rules.setupList')" :key="index">
            {{ $rt(item) }}
          </li>
        </ul>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.roundFlowTitle') }}
        </h2>
        <ol class="mb-4 ps-6">
          <li v-for="(item, index) in $tm('rules.roundFlowList')" :key="index">
            {{ $rt(item) }}
            <ul v-if="index === 1" class="ps-6">
              <li v-for="(guessRule, ruleIndex) in $tm('rules.roundFlowGuesses')" :key="ruleIndex">
                {{ $rt(guessRule) }}
              </li>
            </ul>
          </li>
          <li v-for="(item, index) in $tm('rules.roundFlowList2')" :key="`play-${index}`">
            {{ $rt(item) }}
            <ul v-if="index === 0" class="ps-6">
              <li v-for="(rule, ruleIndex) in $tm('rules.roundFlowHierarchy')" :key="ruleIndex">
                {{ $rt(rule) }}
              </li>
            </ul>
          </li>
          <li v-for="(item, index) in $tm('rules.roundFlowList3')" :key="`after-play-${index}`">
            {{ $rt(item) }}
          </li>
        </ol>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.scoringTitle') }}
        </h2>
        <p class="mb-4">
          {{ $t('rules.scoringText') }}
        </p>
        <ul class="mb-4 ps-6">
          <li v-for="(item, index) in $tm('rules.scoringList')" :key="index">
            {{ $rt(item) }}
          </li>
        </ul>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.trumpTitle') }}
        </h2>
        <p class="mb-4">
          {{ $t('rules.trumpText') }}
        </p>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.winnerTitle') }}
        </h2>
        <p>
          {{ $t('rules.winnerText') }}
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useAppTitle } from "~/composition/useAppTitle";

const { t } = useI18n();
useAppTitle(() => t('rules.title'));
</script>
