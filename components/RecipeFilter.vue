<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';
import { DataType } from '~/global/enums';
import type { GeneralData, IconsGridItem, SelectItem } from '~/global/types';

const store = useFiltersStore();

const ustensils = ref<SelectItem[]>([]);
const ingredients = ref<SelectItem[]>([]);
const mealTypes = ref<SelectItem[]>([]);
const dishTypes = ref<SelectItem[]>([]);
const allergens = ref<IconsGridItem[]>([]);

const fetchUstensils = await useFetch('/api/ustensils/all', {
	method: 'GET',
	watch: false,
});
const fetchIngredients = await useFetch('/api/ingredients/all', {
	method: 'GET',
	watch: false,
});
const fetchMealTypes = await useFetch('/api/mealTypes/all', {
	method: 'GET',
	watch: false,
});
const fetchDishTypes = await useFetch('/api/dishTypes/all', {
	method: 'GET',
	watch: false,
});
const fetchAllergens = await useFetch('/api/allergens/all', {
	method: 'GET',
	watch: false,
});

/*	TODO : when an item is missing (e.g. item with id 1)
	the code loops infinitely and crashes, I don't know why */
watchEffect(() => {
	ingredients.value = mapSelectItems(
		fetchIngredients.data.value ?? [],
		DataType.Ingredient,
		ingredients.value,
	);
	ustensils.value = mapSelectItems(
		fetchUstensils.data.value ?? [],
		DataType.Ustensil,
		ustensils.value,
	);
	mealTypes.value = mapSelectItems(
		fetchMealTypes.data.value ?? [],
		DataType.MealType,
		mealTypes.value,
	);
	dishTypes.value = mapSelectItems(
		fetchDishTypes.data.value ?? [],
		DataType.DishType,
		dishTypes.value,
	);
	allergens.value = mapIconsGridItems(
		fetchAllergens.data.value ?? [],
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

function mapSelectItems<T extends GeneralData>(
	items: T[],
	dataType: DataType,
	oldItems: SelectItem[],
): SelectItem[] {
	return (
		items?.map((item: T) => {
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

function mapIconsGridItems<T extends GeneralData>(
	items: T[],
	dataType: DataType,
	oldItems: IconsGridItem[],
): IconsGridItem[] {
	return (
		items?.map((item: T) => {
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

const { t } = useI18n();
const route = useRoute();
const inRecipesPage = computed(() => {
	return route.params.id !== undefined;
});
const items = ref<AccordionItem[]>([
	{
		label: t('ingredient', 1),
		icon: 'fa6-solid:carrot',
		slot: 'select',
		items: ingredients,
	},
	{
		label: t('ustensil', 2),
		icon: 'solar:ladle-bold',
		slot: 'select',
		items: ustensils,
	},
	{
		label: t('allergens', 1),
		icon: 'streamline:food-wheat-cook-plant-bread-gluten-grain-cooking-nutrition-food-wheat',
		slot: 'icons',
		items: allergens,
	},
	{
		label: t('seasonalRecipes', 1),
		icon: 'fa6-solid:snowflake',
		slot: 'toggle',
		disabled: true,
	},
	{
		label: t('mealTypes', 1),
		icon: 'tabler:sun-moon',
		slot: 'select',
		items: mealTypes,
		disabled: inRecipesPage.value,
	},
	{
		label: t('dishTypes', 1),
		icon: 'streamline:food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food',
		slot: 'select',
		items: dishTypes,
		disabled: inRecipesPage.value,
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
</script>

<template>
	<UDashboardSidebar resizable :defaultSize="22" :minSize="10" :maxSize="30">
		<template #header>
			<span class="mr-auto font-bold">{{ $t('filter') }}</span>
			<UIcon name="material-symbols:filter-alt" class="w-7 h-7" />
		</template>
		<UAccordion :items="items" type="multiple" :ui="{ root: 'flex flex-col w-full' }">
			<template #trailing="{ item }">
				<USwitch v-if="item.slot === 'toggle'" class="ml-auto"
					unchecked-icon="i-lucide-x"
					checked-icon="i-lucide-check"
					v-model="store.seasonalRecipes"/>
			</template>
			<template #body="{ item }">
				<!--<CustomSelect v-if="item.slot != 'toggle'" :items="item.items" :placeholder="$t(item.label!)" :disabled="item.disabled ?? false" />
				<IconsGrid v-else :items="item.items" />-->
				This is the dzqdzq panel.
			</template>
			<template #content="{ item }">
				<!--<CustomSelect v-if="item.slot != 'toggle'" :items="item.items" :placeholder="$t(item.label!)" :disabled="item.disabled ?? false" />
				<IconsGrid v-else :items="item.items" />-->
				This is the dzqdzq panel.
			</template>
		</UAccordion>
	</UDashboardSidebar>
</template>

<style lang="scss">

</style>
