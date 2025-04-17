<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';
import { boolean } from 'drizzle-orm/gel-core';
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
				label: item.name,
				wanted: existingItem ? existingItem.wanted : false,
				notWanted: existingItem ? existingItem.notWanted : false,
				dataType: dataType,
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
				label: item.name,
				icon: 'vscode-icons:default-file',
				active: existingItem ? existingItem.active : false,
				dataType: dataType,
			};
		}) ?? []
	);
}

const { t } = useI18n();
const route = useRoute();
const inRecipesPage = computed(() => {
	return route.params.id !== undefined;
});
const items = ref<(AccordionItem & { itemSlot: string })[]>([
	{
		label: t('ingredient', 1),
		icon: 'fa6-solid:carrot',
		items: ingredients,
		itemSlot: 'select',
	},
	{
		label: t('ustensil', 2),
		icon: 'solar:ladle-bold',
		items: ustensils,
		itemSlot: 'select',
	},
	{
		label: t('allergens', 1),
		icon: 'streamline:food-wheat-cook-plant-bread-gluten-grain-cooking-nutrition-food-wheat',
		items: allergens,
		itemSlot: 'grid',
	},
	{
		label: t('seasonalRecipes', 1),
		icon: 'fa6-solid:snowflake',
		disabled: true,
		itemSlot: 'switch',
	},
	{
		label: t('mealTypes', 1),
		icon: 'tabler:sun-moon',
		items: mealTypes,
		disabled: inRecipesPage.value,
		itemSlot: 'select',
	},
	{
		label: t('dishTypes', 1),
		icon: 'streamline:food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food',
		items: dishTypes,
		disabled: inRecipesPage.value,
		itemSlot: 'select',
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
		<template #default>
			<UAccordion :items="items" type="multiple"
				:ui="{
					root: 'flex flex-col w-full',
					trigger: 'cursor-default! opacity-100!',
				}">
				<template #default="{ item }">
					<!-- TODO : fix this thing
						<USwitch v-if="item.itemSlot === 'switch'" class="ml-auto"
						unchecked-icon="i-lucide-x"
						checked-icon="i-lucide-check"
						v-model="store.seasonalRecipes"/>-->
				</template>
				<template #body="{ item }">
					<CustomSelect v-if="item.itemSlot === 'select'" :items="item.items" class="w-full"
						:placeholder="item.label!" :disabled="item.disabled ?? false" />
					<IconsGrid v-if="item.itemSlot === 'grid'" :items="item.items" />
				</template>
			</UAccordion>
		</template>
	</UDashboardSidebar>
</template>

<style lang="scss">

</style>
