<script setup lang="ts">
import * as locales from '@nuxt/ui-pro/locale';

const { locale } = useI18n();

const lang = computed(() => locales[locale.value].code);
const dir = computed(() => locales[locale.value].dir);

useHead({
	htmlAttrs: {
		lang,
		dir,
	},
});
</script>

<template>
	<UApp :toaster="{ position: 'bottom-left' }" :tooltip="{ disableHoverableContent: true }" :locale="locales[locale]">
		<NuxtLoadingIndicator />
		<UHeader />
		<UMain>
			<NuxtLayout>
				<SeasonalChartComponent />
				<NuxtPage/>
			</NuxtLayout>
		</UMain>
		<UFooter />
	</UApp>
</template>
