<script  lang="ts" setup>
const { locale, localeCodes, setLocale, loadLocaleMessages } = useI18n();

onBeforeMount(async () => {
	await loadLocaleMessages('en');
});
</script>

<template>
	<USelect id="locale-select" variant="none" :model-value="locale" @change="setLocale($event)"
		:options="localeCodes">
		<template #trailing>
			<UIcon name="lucide:languages"/>
		</template>
	</Uselect>
</template>

