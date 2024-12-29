<script setup lang="ts">
import { DataType } from '~/global/enums';
import type { IconsGridItem, SelectItem } from '~/global/types';

const store = useFiltersStore();

const ustensils: SelectItem[] = await mapSelectItems(
	'ustensils',
	DataType.Ustensil,
);
const ingredients: SelectItem[] = await mapSelectItems(
	'ingredients',
	DataType.Ingredient,
);
const mealTypes: SelectItem[] = await mapSelectItems(
	'mealTypes',
	DataType.MealType,
);
const dishTypes: SelectItem[] = await mapSelectItems(
	'dishTypes',
	DataType.DishType,
);
const allergens: IconsGridItem[] = await mapIconsGridItems(
	'allergens',
	DataType.Allergen,
);

async function mapSelectItems(
	name: string,
	dataType: DataType,
): Promise<SelectItem[]> {
	const { data: items } = await useFetch(`/api/${name}/all`, {
		transform: (items) => {
			return items.map((item) => ({
				id: item.id,
				name: item.name,
				wanted: false,
				notWanted: false,
				type: dataType,
			}));
		},
	});
	return items.value ?? [];
}

async function mapIconsGridItems(
	name: string,
	dataType: DataType,
): Promise<IconsGridItem[]> {
	const { data: items } = await useFetch(`/api/${name}/all`, {
		transform: (items) => {
			return items.map((item) => ({
				id: item.id,
				name: item.name,
				icon: 'vscode-icons:default-file',
				active: false,
				type: dataType,
			}));
		},
	});
	return items.value ?? [];
}

let accordionKey = ref(0);
const route = useRoute();
const inRecipesPage = computed(() => {
	return route.params.id !== undefined;
});
const items = ref([
	{
		label: 'Ingrédients',
		icon: 'fa6-solid:carrot',
		slot: 'select',
		items: ingredients,
	},
	{
		label: 'Ustensiles',
		icon: 'solar:ladle-bold',
		slot: 'select',
		items: ustensils,
	},
	{
		label: 'Allergènes',
		icon: 'streamline:food-wheat-cook-plant-bread-gluten-grain-cooking-nutrition-food-wheat',
		slot: 'icons',
		items: allergens,
	},
	{
		label: 'Recettes de saisons',
		icon: 'fa6-solid:snowflake',
		slot: 'toggle',
		disabled: true,
	},
	{
		label: 'Types de repas',
		icon: 'tabler:sun-moon',
		slot: 'select',
		items: mealTypes,
		defaultOpen: inRecipesPage,
		disabled: inRecipesPage,
	},
	{
		label: 'Types de plat',
		icon: 'streamline:food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food',
		slot: 'select',
		items: dishTypes,
		defaultOpen: inRecipesPage,
		disabled: inRecipesPage,
	},
]);

const { seasonalRecipes } = storeToRefs(store);
watch(
	seasonalRecipes,
	async () => {
		await store.fetchFilteredRecipes(seasonalRecipes.value ? 1 : -1);
	},
	{ deep: true },
);
// See https://github.com/nuxt/ui/issues/934
watch(
	inRecipesPage,
	async () => {
		accordionKey.value += 1;
	},
	{ deep: true },
);
</script>

<template>
	<UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
		<UDashboardNavbar title="Filtres" :badge="store.filterNumber ?? 0">
			<template #right>
				<UIcon name="material-symbols:filter-alt" class="w-7 h-7" />
        	</template>
		</UDashboardNavbar>
		<UDashboardSidebar>
			<UAccordion :key="accordionKey" :items="items" multiple :ui="{ wrapper: 'flex flex-col w-full' }">
				<template #default="{ item, open }">
					<UButton v-if="item.slot != 'toggle'" color="gray" variant="ghost" class="border-b border-gray-200 dark:border-gray-700" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">
						<template #leading>
							<UIcon :name="item.icon" class="w-4 h-4 text-gray-900 dark:text-white" />
						</template>
						<span class="truncate">{{ item.label }}</span>
						<template #trailing>
							<UIcon
								name="i-heroicons-chevron-right-20-solid"
								class="w-5 h-5 ms-auto transform transition-transform duration-200"
								:class="[open && 'rotate-90']"
							/>
						</template>
					</UButton>
					<div v-else class="border-b border-gray-200 dark:border-gray-700 flex justify-between p-3 items-center">
						<div class="flex items-center gap-x-1.5">
							<UIcon :name="item.icon" class="w-4 h-4 text-sm font-medium text-gray-900 dark:text-white" />
							<span class="truncate text-sm font-medium">{{ item.label }}</span>
						</div>
						<UToggle
							on-icon="i-heroicons-check-20-solid"
							off-icon="i-heroicons-x-mark-20-solid"
							v-model="store.seasonalRecipes"/>
					</div>
				</template>
				<template #select="{ item, open }">
					<CustomSelect @hook:mounted="() => {
						if (item.disabled) {
							open()
						}
						}" :items="item.items" :placeholder="item.label" :disabled="item.disabled ?? false" />
				</template>
				<template #icons="{ item }">
					<IconsGrid :items="item.items" />
				</template>
			</UAccordion>
		</UDashboardSidebar>
	</UDashboardPanel>
</template>

<style lang="scss">

</style>
