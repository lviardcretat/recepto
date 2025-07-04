import type {
  FilterSelectMenuStates,
  FilterIconsGridStates,
  FilterSwitchStates,
  RecipeWithLessData,
  RecipesCategoriesWithLessData,
  FethRecipesQuery,
  FethRecipesCategoriesQuery,
} from '~/types/filter';

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
    ingredients: FilterSelectMenuUtils.getWantedOrNotSelectMenuItemsIds(
      selectMenuStates.ingredients,
    ),
    ustensils: FilterSelectMenuUtils.getWantedOrNotSelectMenuItemsIds(
      selectMenuStates.ustensils,
    ),
    allergens: FilterIconsGridUtils.getActiveIconsGridItemsIds(
      iconsGridStates.allergens,
    ),
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
    ingredients: FilterSelectMenuUtils.getWantedOrNotSelectMenuItemsIds(
      selectMenuStates.ingredients,
    ),
    ustensils: FilterSelectMenuUtils.getWantedOrNotSelectMenuItemsIds(
      selectMenuStates.ustensils,
    ),
    mealTypes: FilterSelectMenuUtils.getWantedOrNotSelectMenuItemsIds(
      selectMenuStates.mealTypes,
    ),
    dishTypes: FilterSelectMenuUtils.getWantedOrNotSelectMenuItemsIds(
      selectMenuStates.dishTypes,
    ),
    allergens: FilterIconsGridUtils.getActiveIconsGridItemsIds(
      iconsGridStates.allergens,
    ),
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

const FilterUtils = {
/**
 * Calls up the corresponding request according to whether we want to retrieve recipes or recipesCategories
 */
  fetchFilteredItems: async (
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
  },
};

export { FilterUtils };
