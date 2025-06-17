<script setup lang="ts">
import * as locales from '@nuxt/ui-pro/locale';

const { locale } = useI18n();
</script>

<template>
	<UApp :toaster="{ position: 'bottom-left' }" :tooltip="{ disableHoverableContent: true }" :locale="locales[locale]">
		<NuxtLoadingIndicator />
		<NuxtLayout>
			<SeasonalChart/>
			<NuxtPage/>
		</NuxtLayout>
	</UApp>
</template>
