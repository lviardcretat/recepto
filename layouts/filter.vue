<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';

const items = ref<BreadcrumbItem[]>([
	{
		label: 'Home',
		icon: 'i-lucide-house',
		to: '/',
	},
	{
		label: 'Recettes',
		icon: 'ri:bowl-fill',
		to: '/recipes/all',
	},
]);
</script>

<template>
	<UDashboardGroup>
		<RecipeFilter/>
		<UDashboardPanel>
			<template #header>
				<UDashboardNavbar>
					<template #left>
						<h1 class="font-bold">{{ $t('recipe', 2) }}</h1>
					</template>
					<template #right>
						<div class="flex justify-end gap-3">
							<TranslationSelect></TranslationSelect>
							<UColorModeButton />
							<MainSlideover></MainSlideover>
						</div>
					</template>
				</UDashboardNavbar>
				<UDashboardToolbar>
					<UBreadcrumb :items="items" />
				</UDashboardToolbar>
			</template>
			<template #body>
				<slot />
			</template>
		</UDashboardPanel>
		<CreationButton/>
	</UDashboardGroup>
</template>
