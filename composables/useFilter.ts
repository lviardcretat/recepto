import type {
	FilterResults,
	FethRecipesQuery,
	FethRecipesCategoriesQuery,
	RecipesCategoriesWithLessData,
	RecipeWithLessData,
	FilterSelectMenuStates,
	FilterIconsGridStates,
	FilterSwitchStates,
} from '~/types/filter';

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
 * Calls up the corresponding request according to whether we want to retrieve recipes or recipesCategories
 */
export const useFetchFilteredItems = async (
	selectMenuStates: FilterSelectMenuStates,
	iconsGridStates: FilterIconsGridStates,
	switchStates: FilterSwitchStates,
	recipeCategoryId: string | string[] | null = null,
): Promise<RecipeWithLessData[] | RecipesCategoriesWithLessData[]> => {
	if (recipeCategoryId) {
		return await fetchFilteredRecipes(
			recipeCategoryId,
			selectMenuStates,
			iconsGridStates,
			switchStates,
		);
	}
	return await fetchFilteredRecipesCategories(
		selectMenuStates,
		iconsGridStates,
		switchStates,
	);
};

/**
 * Fetch the filtered recipes and assign the result to the recipes state.
 * @param recipeCategoryId The id of the recipecategory associated with filtered recipes.
 */
const fetchFilteredRecipes = async (
	recipeCategoryId: string | string[],
	selectMenuStates: FilterSelectMenuStates,
	iconsGridStates: FilterIconsGridStates,
	switchStates: FilterSwitchStates,
): Promise<RecipeWithLessData[]> => {
	const query: FethRecipesQuery = {
		ingredients: useGetWantedOrNotSelectMenuItemsIds(
			selectMenuStates.ingredients,
		),
		ustensils: useGetWantedOrNotSelectMenuItemsIds(selectMenuStates.ustensils),
		allergens: useGetActiveIconsGridItemsIds(iconsGridStates.allergens),
		recipeCategoryId: recipeCategoryId,
		seasonalRecipes: switchStates.seasonalRecipes,
	};
	const response: RecipeWithLessData[] = await $fetch(
		'/api/recipesCategories/recipes/filtered',
		{
			method: 'GET',
			watch: false,
			default: () => [],
			headers: {
				'Content-Type': 'application/json',
			},
			query: query,
			onResponseError({ response }) {
				throw showError({
					statusCode: response.status,
					statusMessage: response._data.message,
				});
			},
		},
	);
	return response;
};

/**
 * Fetch the filtered recipes and assign the result to the recipesCategories state.
 */
const fetchFilteredRecipesCategories = async (
	selectMenuStates: FilterSelectMenuStates,
	iconsGridStates: FilterIconsGridStates,
	switchStates: FilterSwitchStates,
): Promise<RecipesCategoriesWithLessData[]> => {
	const query: FethRecipesCategoriesQuery = {
		ingredients: useGetWantedOrNotSelectMenuItemsIds(
			selectMenuStates.ingredients,
		),
		ustensils: useGetWantedOrNotSelectMenuItemsIds(selectMenuStates.ustensils),
		mealTypes: useGetWantedOrNotSelectMenuItemsIds(selectMenuStates.mealTypes),
		dishTypes: useGetWantedOrNotSelectMenuItemsIds(selectMenuStates.dishTypes),
		allergens: useGetActiveIconsGridItemsIds(iconsGridStates.allergens),
		seasonalRecipes: switchStates.seasonalRecipes,
	};
	const response: RecipesCategoriesWithLessData[] = await $fetch(
		'/api/recipesCategories/filtered',
		{
			method: 'GET',
			watch: false,
			default: () => [],
			headers: {
				'Content-Type': 'application/json',
			},
			query: query,
			onResponseError({ response }) {
				throw showError({
					statusCode: response.status,
					statusMessage: response._data.message,
				});
			},
		},
	);
	return response;
};

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
