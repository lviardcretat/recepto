<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { SeasonalChartComponent } from '#components';

const overlay = useOverlay();
const modal = overlay.create(SeasonalChartComponent);
defineShortcuts({
	shift_s: {
		usingInput: true,
		handler: () => {
			modal.open();
		},
	},
});

const open = ref(false);
const links: NavigationMenuItem[][] = [
	[
		{
			label: 'mainSlideOver.pages',
			type: 'label',
		},
		{
			label: 'mainSlideOver.recipes',
			icon: 'material-symbols:fastfood',
			to: '/recipes/all',
		},
		{
			label: 'Recettes de saisons',
			icon: 'i-lucide-sun-snow',
			slot: 'shortcut',
			onSelect: (_event: Event) => {
				modal.open();
			},
		},
		{
			label: 'mainSlideOver.calendar',
			icon: 'material-symbols:calendar-today',
			disabled: true,
		},
	],
	[],
];
</script>

<template>
  	<UDashboardGroup unit="rem">
		<UDashboardSidebar
			id="default"
			:default-size="40"
			v-model:open="open"
			collapsible
			resizable
			class="bg-elevated/25"
			:ui="{ footer: 'lg:border-t lg:border-default' }">
			<template #header>
				<NuxtImg src="image" />
			</template>

			<template #default="{ collapsed }">
				<UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

				<UNavigationMenu
					:collapsed="collapsed"
					:items="links"
					orientation="vertical"
					tooltip
					popover
					:ui="{linkLabel: 'inherit'}">
					<template #item-label="{ item }">
						{{ $t(item.label ?? "") }}
					</template>
					<template #shortcut-label="{ item }">
						<div class="flex items-center justify-between">
							{{ $t(item.label ?? "") }}
							<div class="flex items-center gap-1">
								<UKbd value="shift"></UKbd>
								<UKbd value="S"></UKbd>
							</div>
						</div>
					</template>
				</UNavigationMenu>
				<FilterPanelComponent :collapsed="collapsed" />
			</template>

			<template #footer="{ collapsed }">
				<UserMenuComponent :collapsed="collapsed" />
			</template>
		</UDashboardSidebar>

		<CustomDashboardSearchComponent />
		<CreationButtonComponent />

		<UDashboardPanel id="home">
			<template #header>
				<UDashboardNavbar :title="$t('recipe', 2)" :ui="{ right: 'gap-3' }">
					<template #leading>
						<UDashboardSidebarCollapse />
					</template>

					<template #right>
						<TranslationSelectComponent />
						<UColorModeButton />
					</template>
				</UDashboardNavbar>
			</template>

			<template #body>
				<slot />
			</template>
		</UDashboardPanel>
  	</UDashboardGroup>
</template>

<style>
	button:not(*:disabled) > .inherit {
		width: inherit;
	}
</style>
