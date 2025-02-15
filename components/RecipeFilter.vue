<script setup lang="ts">
import { DataType } from '~/global/enums';
import type { IconsGridItem, SelectItem } from '~/global/types';

const store = useFiltersStore();

const ustensils = ref<SelectItem[]>([]);
const ingredients = ref<SelectItem[]>([]);
const mealTypes = ref<SelectItem[]>([]);
const dishTypes = ref<SelectItem[]>([]);
const allergens = ref<IconsGridItem[]>([]);

const fetchUstensils = useFetch('/api/ustensils/all', {
	method: 'GET',
	watch: false,
});
const fetchIngredients = useFetch('/api/ingredients/all', {
	method: 'GET',
	watch: false,
});
const fetchMealTypes = useFetch('/api/mealTypes/all', {
	method: 'GET',
	watch: false,
});
const fetchDishTypes = useFetch('/api/dishTypes/all', {
	method: 'GET',
	watch: false,
});
const fetchAllergens = useFetch('/api/allergens/all', {
	method: 'GET',
	watch: false,
});

watchEffect(() => {
	ingredients.value = mapSelectItems(
		fetchIngredients.data.value,
		DataType.Ingredient,
		ustensils.value,
	);
	ustensils.value = mapSelectItems(
		fetchUstensils.data.value,
		DataType.Ustensil,
		ustensils.value,
	);
	mealTypes.value = mapSelectItems(
		fetchMealTypes.data.value,
		DataType.MealType,
		mealTypes.value,
	);
	dishTypes.value = mapSelectItems(
		fetchDishTypes.data.value,
		DataType.DishType,
		dishTypes.value,
	);
	allergens.value = mapIconsGridItems(
		fetchAllergens.data.value,
		DataType.Allergen,
		allergens.value,
	);
});

useListen('ustensil:created', async () => {
	await fetchUstensils.refresh();
});

useListen('ingredient:created', async () => {
	await fetchIngredients.refresh();
});

function mapSelectItems(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	items: any,
	dataType: DataType,
	oldItems: SelectItem[],
): SelectItem[] {
	return (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		items?.map((item: any) => {
			const existingItem = oldItems.find((oldItem) => oldItem.id === item.id);
			return {
				id: item.id,
				name: item.name,
				wanted: existingItem ? existingItem.wanted : false,
				notWanted: existingItem ? existingItem.notWanted : false,
				type: dataType,
			};
		}) ?? []
	);
}

function mapIconsGridItems(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	items: any,
	dataType: DataType,
	oldItems: IconsGridItem[],
): IconsGridItem[] {
	return (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		items?.map((item: any) => {
			const existingItem = oldItems.find((oldItem) => oldItem.id === item.id);
			return {
				id: item.id,
				name: item.name,
				icon: 'vscode-icons:default-file',
				active: existingItem ? existingItem.active : false,
				type: dataType,
			};
		}) ?? []
	);
}

let accordionKey = ref(0);
const route = useRoute();
const inRecipesPage = computed(() => {
	return route.params.id !== undefined;
});
const items = ref([
	{
		label: 'ingredient',
		pluralTranslation: true,
		icon: 'fa6-solid:carrot',
		slot: 'select',
		items: ingredients,
	},
	{
		label: 'ustensil',
		pluralTranslation: true,
		icon: 'solar:ladle-bold',
		slot: 'select',
		items: ustensils,
	},
	{
		label: 'allergens',
		icon: 'streamline:food-wheat-cook-plant-bread-gluten-grain-cooking-nutrition-food-wheat',
		slot: 'icons',
		items: allergens,
	},
	{
		label: 'seasonalRecipes',
		icon: 'fa6-solid:snowflake',
		slot: 'toggle',
		disabled: true,
	},
	{
		label: 'mealTypes',
		icon: 'tabler:sun-moon',
		slot: 'select',
		items: mealTypes,
		defaultOpen: inRecipesPage,
		disabled: inRecipesPage,
	},
	{
		label: 'dishTypes',
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
		<UDashboardNavbar :title="$t('filter')" :badge="store.filterNumber ?? 0">
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
						<span class="truncate">{{ $t(item.label, item.pluralTranslation ? 2 : 1) }}</span>
						<template #trailing>
							<UIcon
								name="i-heroicons-chevron-right-20-solid"
								class="w-5 h-5 ms-auto transform transition-transform duration-200"
								:class="[open && 'rotate-90']"/>
						</template>
					</UButton>
					<div v-else class="border-b border-gray-200 dark:border-gray-700 flex justify-between p-3 items-center">
						<div class="flex items-center gap-x-1.5">
							<UIcon :name="item.icon" class="w-4 h-4 text-sm font-medium text-gray-900 dark:text-white" />
							<span class="truncate text-sm font-medium">{{ $t(item.label) }}</span>
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
						}" :items="item.items" :placeholder="$t(item.label)" :disabled="item.disabled ?? false" />
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
