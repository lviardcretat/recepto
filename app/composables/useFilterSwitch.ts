import type { FilterSwitchStates } from '~/types/filter';

/**
 * Allows you to recover states from the composable.
 * @returns The list of Switch filters under the states form.
 */
export const useFilterSwitchStates = () =>
  useState<FilterSwitchStates>('filterSwitchStates', () => ({
    seasonalRecipes: false,
  }));

export const useResetFilterSwitchStates = (): void => {
  const switchStates: Ref<FilterSwitchStates> = useFilterSwitchStates();
  switchStates.value.seasonalRecipes = false;
};
