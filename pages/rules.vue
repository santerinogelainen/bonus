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
        <p class="mb-4">
          {{ $t('rules.setupText') }}
        </p>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.roundFlowTitle') }}
        </h2>
        <p class="mb-4">
          {{ $t('rules.roundFlowText1') }}
        </p>
        <p class="mb-4">
          {{ $t('rules.roundFlowText2') }}
        </p>

        <h2 class="text-h6 mb-2">
          {{ $t('rules.scoringTitle') }}
        </h2>
        <p class="mb-4">
          {{ $t('rules.scoringText') }}
        </p>

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
