import type { IFilterResults } from '~/types/filter/results';

/**
 * Allows you to recover states from the composable.
 * @returns The list of recipes and recipeacategories filtered under the states form.
 */
export const useFilterResults = () =>
  useState<IFilterResults>('filterResults', () => ({
    recipesCategories: [],
    recipes: [],
  }));

/**
 * Reset all filters states.
 */
export const useResetAllFilters = (): void => {
  useResetFilterSelectMenuStates();
  useResetFilterSelectedMenuStates();
  useResetFilterIconsGridStates();
  useResetFilterSwitchStates();
};
