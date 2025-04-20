<template>
  <v-btn-group>
    <v-btn
      v-for="locale in availableLocales"
      :key="locale"
      :variant="currentLocale === locale ? 'elevated' : 'text'"
      @click="switchLanguage(locale)"
      size="small"
    >
      {{ locale.toUpperCase() }}
    </v-btn>
  </v-btn-group>
</template>

<script setup lang="ts">
const availableLocales = ['en', 'fi', 'et']
const { setLocale, locale: currentLocale } = useI18n()

const switchLanguage = (code: any) => {
  setLocale(code)
  navigateTo(useRoute().path, { replace: true })
}
</script> 