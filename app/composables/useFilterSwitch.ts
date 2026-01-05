import type { FilterSwitchStates } from '~/types/filter/switch';

/**
 * Allows you to recover states from the composable.
 * @returns The list of Switch filters under the states form.
 */
export const useFilterSwitchStates = () =>
  useState<FilterSwitchStates>('filterSwitchStates', () => ({
    seasonalRecipes: false,
  }));

/**
 * Resets all switch filter states to their default values.
 */
export const useResetFilterSwitchStates = (): void => {
  const switchStates: Ref<FilterSwitchStates> = useFilterSwitchStates();
  switchStates.value.seasonalRecipes = false;
};
