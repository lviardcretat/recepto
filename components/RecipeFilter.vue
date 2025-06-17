<script setup lang="ts">
import type {
	AccordionItem,
	NavigationMenuChildItem,
	NavigationMenuItem,
} from '@nuxt/ui';
import {
	FilterAccordionsDataType,
	FilterAccordionsSlots,
	FilterIconsGridStatesType,
	FilterSelectMenuStatesType,
} from '~/global/enums/filter';
import type { CustomAccordionItem } from '~/global/types/filter';

defineProps<{
	collapsed?: boolean;
}>();

const { t } = useI18n();
const swicthStates = useFilterSwitchStates();
const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();

await callOnce(async () => {
	const ustensilsFetch = await $fetch('/api/ustensils/all', {
		method: 'GET',
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	});
	const ingredientsFetch = await $fetch('/api/ingredients/all', {
		method: 'GET',
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	});
	const mealTypesFetch = await $fetch('/api/mealTypes/all', {
		method: 'GET',
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	});
	const dishTypesFetch = await $fetch('/api/dishTypes/all', {
		method: 'GET',
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	});
	const allergensFetch = await $fetch('/api/allergens/all', {
		method: 'GET',
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	});

	selectMenuStates.value.ustensils = useMapFilterSelectMenuItems(
		ustensilsFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.Ustensil],
		FilterSelectMenuStatesType.Ustensil,
	);
	selectMenuStates.value.ingredients = useMapFilterSelectMenuItems(
		ingredientsFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.Ingredient],
		FilterSelectMenuStatesType.Ingredient,
	);
	selectMenuStates.value.mealTypes = useMapFilterSelectMenuItems(
		mealTypesFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.MealType],
		FilterSelectMenuStatesType.MealType,
	);
	selectMenuStates.value.dishTypes = useMapFilterSelectMenuItems(
		dishTypesFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.DishType],
		FilterSelectMenuStatesType.DishType,
	);
	iconsGridStates.value.allergens = useMapIconsGridItems(
		allergensFetch,
		iconsGridStates.value[FilterIconsGridStatesType.Allergen],
		FilterIconsGridStatesType.Allergen,
	);
});

useListen('ustensil:created', async () => {
	const ustensilsFetch = await $fetch('/api/ustensils/all', {
		method: 'GET',
	});
	selectMenuStates.value.ustensils = useMapFilterSelectMenuItems(
		ustensilsFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.Ustensil],
		FilterSelectMenuStatesType.Ustensil,
	);
});

useListen('ingredient:created', async () => {
	const ingredientsFetch = await $fetch('/api/ingredients/all', {
		method: 'GET',
	});
	selectMenuStates.value.ingredients = useMapFilterSelectMenuItems(
		ingredientsFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.Ingredient],
		FilterSelectMenuStatesType.Ingredient,
	);
});

const items = ref<(NavigationMenuItem & CustomAccordionItem)[]>([
	{
		label: 'Filtres',
		type: 'label',
	},
	{
		label: t('ingredient', 1),
		icon: 'fa6-solid:carrot',
		children: [
			{
				label: t('ingredient', 1),
				itemSlot: FilterAccordionsSlots.Select,
				dataType: FilterAccordionsDataType.Ingredient,
				slot: 'custom',
			},
		],
	},
	{
		label: t('ustensil', 2),
		icon: 'solar:ladle-bold',
		children: [
			{
				label: t('ustensil', 2),
				itemSlot: FilterAccordionsSlots.Select,
				dataType: FilterAccordionsDataType.Ustensil,
				slot: 'custom',
			},
		],
	},
	{
		label: t('allergens', 1),
		icon: 'streamline:food-wheat-cook-plant-bread-gluten-grain-cooking-nutrition-food-wheat',
		children: [
			{
				label: t('allergens', 1),
				itemSlot: FilterAccordionsSlots.Grid,
				dataType: FilterAccordionsDataType.Allergen,
				slot: 'custom',
			},
		],
	},
	{
		label: t('seasonalRecipes', 1),
		icon: 'fa6-solid:snowflake',
		disabled: true,
		children: [
			{
				label: t('seasonalRecipes', 1),
				disabled: true,
				itemSlot: FilterAccordionsSlots.Switch,
				dataType: FilterAccordionsDataType.Season,
				slot: 'custom',
			},
		],
	},
	{
		label: t('mealTypes', 1),
		icon: 'tabler:sun-moon',
		children: [
			{
				label: t('mealTypes', 1),
				itemSlot: FilterAccordionsSlots.Select,
				dataType: FilterAccordionsDataType.MealType,
				slot: 'custom',
			},
		],
	},
	{
		label: t('dishTypes', 1),
		icon: 'streamline:food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food',
		children: [
			{
				label: t('dishTypes', 1),
				itemSlot: FilterAccordionsSlots.Select,
				dataType: FilterAccordionsDataType.DishType,
				slot: 'custom',
			},
		],
	},
]);
</script>

<template>
	<UNavigationMenu
		:items="items"
		orientation="vertical"
		:collapsed="collapsed"
		popover>
		<template #item-content="{ item }">
			<CustomSelect v-if="item.children![0].itemSlot === FilterAccordionsSlots.Select" class="w-full"
				:placeholder="item.label!" :disabled="item.disabled ?? false" :dataType="item.children![0].dataType as unknown as FilterSelectMenuStatesType"/>
			<IconsGrid v-if="item.children![0].itemSlot === FilterAccordionsSlots.Grid" :dataType="item.children![0].dataType as unknown as FilterIconsGridStatesType"/>
		</template>
		<template #custom="{ item }">
			<CustomSelect v-if="(item as NavigationMenuItem & CustomAccordionItem).itemSlot === FilterAccordionsSlots.Select" class="w-full"
				:placeholder="(item as NavigationMenuItem & CustomAccordionItem).label!" :disabled="(item as NavigationMenuItem & CustomAccordionItem).disabled ?? false" :dataType="(item as NavigationMenuItem & CustomAccordionItem).dataType as unknown as FilterSelectMenuStatesType"/>
			<IconsGrid v-if="(item as NavigationMenuItem & CustomAccordionItem).itemSlot === FilterAccordionsSlots.Grid" :dataType="(item as NavigationMenuItem & CustomAccordionItem).dataType as unknown as FilterIconsGridStatesType"/>
		</template>
	</UNavigationMenu>
</template>

<style lang="scss">

</style>
