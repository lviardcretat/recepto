<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';
import {
	FilterAccordionsDataType,
	FilterAccordionsSlots,
	FilterIconsGridStatesType,
	FilterSelectMenuStatesType,
} from '~/global/enums/filter';
import type { CustomAccordionItem } from '~/global/types/filter';

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

const items = ref<(AccordionItem & CustomAccordionItem)[]>([
	{
		label: t('ingredient', 1),
		icon: 'fa6-solid:carrot',
		itemSlot: FilterAccordionsSlots.Select,
		dataType: FilterAccordionsDataType.Ingredient,
	},
	{
		label: t('ustensil', 2),
		icon: 'solar:ladle-bold',
		itemSlot: FilterAccordionsSlots.Select,
		dataType: FilterAccordionsDataType.Ustensil,
	},
	{
		label: t('allergens', 1),
		icon: 'streamline:food-wheat-cook-plant-bread-gluten-grain-cooking-nutrition-food-wheat',
		itemSlot: FilterAccordionsSlots.Grid,
		dataType: FilterAccordionsDataType.Allergen,
	},
	{
		label: t('seasonalRecipes', 1),
		icon: 'fa6-solid:snowflake',
		disabled: true,
		itemSlot: FilterAccordionsSlots.Switch,
		dataType: FilterAccordionsDataType.Season,
	},
	{
		label: t('mealTypes', 1),
		icon: 'tabler:sun-moon',
		itemSlot: FilterAccordionsSlots.Select,
		dataType: FilterAccordionsDataType.MealType,
	},
	{
		label: t('dishTypes', 1),
		icon: 'streamline:food-kitchenware-serving-dome-cook-tool-dome-kitchen-serving-paltter-dish-tools-food',
		itemSlot: FilterAccordionsSlots.Select,
		dataType: FilterAccordionsDataType.DishType,
	},
]);
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
					<CustomSelect v-if="item.itemSlot === FilterAccordionsSlots.Select" class="w-full"
						:placeholder="item.label!" :disabled="item.disabled ?? false" :dataType="item.dataType as unknown as FilterSelectMenuStatesType"/>
					<IconsGrid v-if="item.itemSlot === FilterAccordionsSlots.Grid" :dataType="item.dataType as unknown as FilterIconsGridStatesType"/>
				</template>
			</UAccordion>
		</template>
	</UDashboardSidebar>
</template>

<style lang="scss">

</style>
