<script setup lang="ts">
import type {
	BreadcrumbItem,
	CommandPaletteGroup,
	CommandPaletteItem,
	NavigationMenuItem,
} from '@nuxt/ui';
import type { RecipeSearched } from '~/types/search';

const { t } = useI18n();
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
	transform: (recipes: RecipeSearched[]): CommandPaletteItem[] => {
		return recipes.map((recipe): CommandPaletteItem => {
			return {
				label: recipe.label,
				icon: 'i-lucide-music',
			};
		});
	},
	onResponseError({ response }) {
		throw showError({
			statusCode: response.status,
			statusMessage: response.statusText,
		});
	},
});

await execute();
const search = ref<CommandPaletteGroup<CommandPaletteItem>[]>([
	{
		id: 'recipes',
		items: data.value,
	},
]);
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

		<UDashboardSearch :color-mode="false" v-model="searchValue" :groups="search"/>
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
