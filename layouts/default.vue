<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const open = ref(false);
const links = [
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
			label: 'mainSlideOver.calendar',
			icon: 'material-symbols:calendar-today',
			disabled: true,
		},
	],
	[],
] satisfies NavigationMenuItem[][];
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
			<template #header="{ collapsed }">
				<NuxtImg src="image" />
			</template>

			<template #default="{ collapsed }">
				<UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" />

				<UNavigationMenu
					:collapsed="collapsed"
					:items="links"
					orientation="vertical"
					tooltip
					popover>
					<template #item-label="{ item }">
						{{ $t(item.label) }}
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
