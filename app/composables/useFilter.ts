import type { FilterResults } from '~/types/filter';

/**
 * Allows you to recover states from the composable.
 * @returns The list of recipes and recipeacategories filtered under the states form.
 */
export const useFilterResults = () =>
	useState<FilterResults>('filterResults', () => ({
		recipesCategories: [],
		recipes: [],
	}));

/**
 * Reset all filters states.
 */
export const useResetAllFilters = (): void => {
	const swicthStates = useFilterSwitchStates();
	const selectMenuStates = useFilterSelectMenuStates();
	const iconsGridStates = useFilterIconsGridStates();
	swicthStates.value.seasonalRecipes = false;
	selectMenuStates.value.dishTypes = [];
	selectMenuStates.value.mealTypes = [];
	selectMenuStates.value.ingredients = [];
	selectMenuStates.value.ustensils = [];
	iconsGridStates.value.allergens = [];
};
