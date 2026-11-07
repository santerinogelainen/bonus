<template>
  <v-select
    :model-value="currentLocale"
    :items="locales"
    item-title="name"
    item-value="code"
    variant="plain"
    class="pe-2 mt-1"
    :loading="switching"
    :disabled="switching"
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
const switching = ref(false)

const switchLanguage = async (code: LocaleCode) => {
  if (switching.value || code === currentLocale.value) return

  switching.value = true
  try {
    await setLocale(code)
  } finally {
    switching.value = false
  }
}
</script>