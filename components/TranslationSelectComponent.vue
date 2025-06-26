<script  lang="ts" setup>
import { en, fr } from '@nuxt/ui/locale';

const { locale, setLocale, loadLocaleMessages } = useI18n();

onBeforeMount(async () => {
	await loadLocaleMessages('en');
});
</script>

<template>
  <ULocaleSelect variant="ghost" v-model="locale"
  	@update:modelValue="setLocale($event as 'en' | 'fr')" :locales="[en, fr]" />
</template>
