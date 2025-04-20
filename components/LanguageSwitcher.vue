<template>
  <v-select
    v-model="currentLocale"
    :items="locales"
    item-title="name"
    item-value="code"
    variant="plain"
    class="pe-2 mt-1"
    @update:model-value="switchLanguage"
  >
    <template #selection="{ item }">
      {{ item?.raw?.name }}
    </template>
  </v-select>
</template>

<script setup lang="ts">
type LocaleCode = 'en' | 'fi' | 'et'

const locales = [
  { code: 'en' as LocaleCode, name: 'English' },
  { code: 'fi' as LocaleCode, name: 'Suomi' },
  { code: 'et' as LocaleCode, name: 'Eesti' }
]
const { setLocale, locale: currentLocale } = useI18n()

const switchLanguage = (code: LocaleCode) => {
  setLocale(code)
  navigateTo(useRoute().path, { replace: true })
}
</script>