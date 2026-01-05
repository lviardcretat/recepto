import type { FilterSelectMenuStates } from '~/types/filter/selectMenu';
import type { FilterIconsGridStates } from '~/types/filter/iconsGrid';
import type { FilterSwitchStates } from '~/types/filter/switch';
import type { IRecipeWithLessData } from '~/types/recipe/detail';
import type { IRecipesCategoriesWithLessData } from '~/types/recipesCategory/detail';
import type { IFetchRecipesQuery } from '~/types/recipe/filter';
import type { IFetchRecipesCategoriesQuery } from '~/types/recipesCategory/filter';

/**
 * Fetches filtered recipes based on current filter states.
 * @param recipeCategoryId - The ID of the recipe category to filter within
 * @param selectMenuStates - Current state of select menu filters (ingredients, utensils)
 * @param iconsGridStates - Current state of icons grid filters (allergens)
 * @param switchStates - Current state of switch filters (seasonal recipes)
 * @returns Array of filtered recipes with basic data
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
 * Fetches filtered recipe categories based on current filter states.
 * @param selectMenuStates - Current state of select menu filters
 * @param iconsGridStates - Current state of icons grid filters
 * @param switchStates - Current state of switch filters
 * @returns Array of filtered recipe categories with basic data
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
   * Fetches filtered items based on context.
   * Returns recipes if recipeCategoryId is provided, otherwise returns recipe categories.
   *
   * @param selectMenuStates - Current state of select menu filters
   * @param iconsGridStates - Current state of icons grid filters
   * @param switchStates - Current state of switch filters
   * @param recipeCategoryId - Optional category ID to fetch recipes for
   * @returns Array of filtered recipes or recipe categories
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
