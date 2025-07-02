<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import {
	FilterAccordionsDataType,
	FilterAccordionsSlots,
	FilterIconsGridStatesType,
	FilterSelectMenuStatesType,
} from '~/enums/filter';
import type { CustomAccordionItem } from '~/types/filter';

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
		selectMenuStates.value[FilterSelectMenuStatesType.USTENSIL],
		FilterSelectMenuStatesType.USTENSIL,
	);
	selectMenuStates.value.ingredients = useMapFilterSelectMenuItems(
		ingredientsFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.INGREDIENT],
		FilterSelectMenuStatesType.INGREDIENT,
	);
	selectMenuStates.value.mealTypes = useMapFilterSelectMenuItems(
		mealTypesFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.MEAL_TYPE],
		FilterSelectMenuStatesType.MEAL_TYPE,
	);
	selectMenuStates.value.dishTypes = useMapFilterSelectMenuItems(
		dishTypesFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.DISH_TYPE],
		FilterSelectMenuStatesType.DISH_TYPE,
	);
	iconsGridStates.value.allergens = useMapIconsGridItems(
		allergensFetch,
		iconsGridStates.value[FilterIconsGridStatesType.ALLERGEN],
		FilterIconsGridStatesType.ALLERGEN,
	);
});

useListen('ustensil:created', async () => {
	const ustensilsFetch = await $fetch('/api/ustensils/all', {
		method: 'GET',
	});
	selectMenuStates.value.ustensils = useMapFilterSelectMenuItems(
		ustensilsFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.USTENSIL],
		FilterSelectMenuStatesType.USTENSIL,
	);
});

useListen('ingredient:created', async () => {
	const ingredientsFetch = await $fetch('/api/ingredients/all', {
		method: 'GET',
	});
	selectMenuStates.value.ingredients = useMapFilterSelectMenuItems(
		ingredientsFetch,
		selectMenuStates.value[FilterSelectMenuStatesType.INGREDIENT],
		FilterSelectMenuStatesType.INGREDIENT,
	);
});

const items = computed(
	() =>
		[
			{
				label: t('filter'),
				type: 'label',
			},
			{
				label: t('ingredient'),
				icon: 'fa6-solid:carrot',
				children: [
					{
						label: t('ingredient'),
						itemSlot: FilterAccordionsSlots.SELECT,
						dataType: FilterAccordionsDataType.INGREDIENT,
						slot: 'custom',
					},
				],
			},
			{
				label: t('ustensil'),
				icon: 'solar:ladle-bold',
				children: [
					{
						label: t('ustensil'),
						itemSlot: FilterAccordionsSlots.SELECT,
						dataType: FilterAccordionsDataType.USTENSIL,
						slot: 'custom',
					},
				],
			},
			{
				label: t('allergens'),
				icon: 'streamline:food-wheat-cook-plant-bread-gluten-grain-cooking-nutrition-food-wheat',
				children: [
					{
						label: t('allergens'),
						itemSlot: FilterAccordionsSlots.GRID,
						dataType: FilterAccordionsDataType.ALLERGEN,
						slot: 'custom',
					},
				],
			},
			{
				label: t('seasonalRecipes'),
				icon: 'fa6-solid:snowflake',
				disabled: true,
				children: [
					{
						label: t('seasonalRecipes'),
						disabled: true,
						itemSlot: FilterAccordionsSlots.SWITCH,
						dataType: FilterAccordionsDataType.SEASON,
						slot: 'custom',
					},
				],
			},
			{
				label: t('mealTypes'),
				icon: 'tabler:sun-moon',
				children: [
					{
						label: t('mealTypes'),
						itemSlot: FilterAccordionsSlots.SELECT,
						dataType: FilterAccordionsDataType.MEAL_TYPE,
						slot: 'custom',
					},
				],
			},
			{
				label: t('dishTypes'),
				icon: 'streamline:food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food',
				children: [
					{
						label: t('dishTypes'),
						itemSlot: FilterAccordionsSlots.SELECT,
						dataType: FilterAccordionsDataType.DISH_TYPE,
						slot: 'custom',
					},
				],
			},
		] satisfies (NavigationMenuItem & CustomAccordionItem)[],
);
</script>

<template>
	<UNavigationMenu
		:items="items"
		orientation="vertical"
		:collapsed="collapsed"
		popover>
		<template #item-content="{ item }">
			<FilterCustomSelectComponent v-if="item.children![0].itemSlot === FilterAccordionsSlots.SELECT" class="w-full"
				:placeholder="item.label!" :disabled="item.disabled ?? false" :dataType="item.children![0].dataType as unknown as FilterSelectMenuStatesType"/>
			<FilterIconsGridComponent v-if="item.children![0].itemSlot === FilterAccordionsSlots.GRID" :dataType="item.children![0].dataType as unknown as FilterIconsGridStatesType"/>
		</template>
		<template #custom="{ item }">
			<FilterCustomSelectComponent v-if="(item as NavigationMenuItem & CustomAccordionItem).itemSlot === FilterAccordionsSlots.SELECT" class="w-full"
				:placeholder="(item as NavigationMenuItem & CustomAccordionItem).label!" :disabled="(item as NavigationMenuItem & CustomAccordionItem).disabled ?? false" :dataType="(item as NavigationMenuItem & CustomAccordionItem).dataType as unknown as FilterSelectMenuStatesType"/>
			<FilterIconsGridComponent v-if="(item as NavigationMenuItem & CustomAccordionItem).itemSlot === FilterAccordionsSlots.GRID" :dataType="(item as NavigationMenuItem & CustomAccordionItem).dataType as unknown as FilterIconsGridStatesType"/>
		</template>
	</UNavigationMenu>
</template>

<style lang="scss">

</style>
