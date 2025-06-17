<script  lang="ts" setup>
const { locale, localeCodes, setLocale, loadLocaleMessages } = useI18n();

onBeforeMount(async () => {
	await loadLocaleMessages('en');
});
</script>

<template>
	<USelect id="locale-select" variant="none" :model-value="locale" @update:modelValue="setLocale($event)"
		trailing-icon="lucide:languages"
		:items="localeCodes">
	</Uselect>
</template>

