<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const links: NavigationMenuItem[] = [
	{
		label: 'recipe',
		pluralTranslation: true,
		icon: 'material-symbols:fastfood',
		to: '/recipes/all',
	},
	{
		label: 'schedule',
		pluralTranslation: false,
		icon: 'material-symbols:calendar-today',
		badge: '4',
	},
	{
		label: 'shoppingList',
		pluralTranslation: false,
		icon: 'ic:baseline-featured-play-list',
	},
	{
		label: 'dashboard',
		pluralTranslation: false,
		icon: 'material-symbols:space-dashboard-outline',
		to: '/user/dashboard',
	},
	{
		label: 'recipe',
		pluralTranslation: false,
		icon: 'i-heroicons-cog-8-tooth',
		children: [
			{
				label: 'recipe',
			},
			{
				label: 'recipe',
			},
			{
				label: 'recipe',
			},
		],
	},
];
</script>

<template>
	<USlideover :title="$t('menu')" side="right">
		<UButton variant="link"
			icon="streamline:interface-setting-menu-1-button-parallel-horizontal-lines-menu-navigation-three-hamburger"/>
		<template #body>
			<UNavigationMenu :items="links" orientation="vertical">
				<template #item-content="{ item }">
					<div>{{ $t(item.label!, item.pluralTranslation ? 2 : 1) }}</div>
				</template>
			</UNavigationMenu>
		</template>
	</USlideover>
</template>

<style lang="scss">

</style>
