import type { FilterSelectMenuStates } from '~/types/filter/selectMenu';
import type { FilterIconsGridStates } from '~/types/filter/iconsGrid';
import type { FilterSwitchStates } from '~/types/filter/switch';
import type { IRecipeWithLessData } from '~/types/recipe/detail';
import type { IRecipesCategoriesWithLessData } from '~/types/recipesCategory/detail';
import type { IFetchRecipesQuery } from '~/types/recipe/filter';
import type { IFetchRecipesCategoriesQuery } from '~/types/recipesCategory/filter';

/**
 * Fetch the filtered recipes and assign the result to the recipes state.
 * @param recipeCategoryId The id of the recipecategory associated with filtered recipes.
 */
const fetchFilteredRecipes = async (
  recipeCategoryId: string | string[],
  selectMenuStates: FilterSelectMenuStates,
  iconsGridStates: FilterIconsGridStates,
  switchStates: FilterSwitchStates,
): Promise<IRecipeWithLessData[]> => {
  const query: IFetchRecipesQuery = {
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
  const response: IRecipeWithLessData[] = await useRecipesRequest().fetchFiltered(query);
  return response;
};

/**
 * Fetch the filtered recipes and assign the result to the recipesCategories state.
 */
const fetchFilteredRecipesCategories = async (
  selectMenuStates: FilterSelectMenuStates,
  iconsGridStates: FilterIconsGridStates,
  switchStates: FilterSwitchStates,
): Promise<IRecipesCategoriesWithLessData[]> => {
  const query: IFetchRecipesCategoriesQuery = {
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
  const response: IRecipesCategoriesWithLessData[] = await useRecipesCategoriesRequest().fetchFiltered(query);
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
  ): Promise<IRecipeWithLessData[] | IRecipesCategoriesWithLessData[]> => {
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
