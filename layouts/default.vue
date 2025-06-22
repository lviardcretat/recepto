<script setup lang="ts">
import type {
	BreadcrumbItem,
	CommandPaletteGroup,
	CommandPaletteItem,
	NavigationMenuItem,
} from '@nuxt/ui';
import type { RecipeSearched } from '~/types/search';

const { t } = useI18n();
const open = ref(false);
const links = [
	[
		{
			label: 'Pages',
			type: 'label',
		},
		{
			label: t('mainSlideOver.recipes'),
			icon: 'material-symbols:fastfood',
			to: '/recipes/all',
		},
		{
			label: t('mainSlideOver.calendar'),
			icon: 'material-symbols:calendar-today',
			disabled: true,
		},
	],
	[],
] satisfies NavigationMenuItem[][];

const searchValue = ref({});
const { data, execute, clear } = useFetch('/api/recipesCategories/search', {
	method: 'GET',
	query: {
		name: searchValue,
	},
	immediate: false,
	default: () => [],
	watch: false,
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
});

await execute();
const search = ref<CommandPaletteGroup<CommandPaletteItem>[]>(data.value);
console.log(search.value);
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
					popover />
				<FilterPanelComponent :collapsed="collapsed" />
			</template>

			<template #footer="{ collapsed }">
				<UserMenuComponent :collapsed="collapsed" />
			</template>
		</UDashboardSidebar>

		<UDashboardSearch :color-mode="false" v-model="searchValue" :groups="search">
			<template #truc-label="{ item }">
				<span onclick="console.log('ddzqd')">{{ item.label }}</span>
			</template>
		</UDashboardSearch>
		<CreationButtonComponent />

		<UDashboardPanel id="home">
			<template #header>
				<UDashboardNavbar title="Recettes" :ui="{ right: 'gap-3' }">
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
