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
  useResetFilterSelectMenuStates();
  useResetFilterSelectedMenuStates();
  useResetFilterIconsGridStates();
  useResetFilterSwitchStates();
};
