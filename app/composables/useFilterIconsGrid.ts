import type { FilterIconsGridStatesType } from '~/enums/filter';
import type { FilterIconsGridStates } from '~/types/filter';

/**
 * Allows you to recover states from the composable.
 * @returns The list of IconsGrid filters under the states form.
 */
export const useFilterIconsGridStates = () =>
  useState<FilterIconsGridStates>('filterIconsGridStates', () => ({
    allergens: [],
  }));

/**
 * Update the corresponding state according to the filter modified by the user.
 * @param id The id of the filtered item.
 * @param active Whether the filtered item is active or not.
 * @param dataType The type of the filter list modified.
 */
export const useUpdateFilterIconsGrid = async (
  id: number,
  active: boolean,
  dataType: FilterIconsGridStatesType,
): Promise<void> => {
  if (id <= 0) {
    return;
  }
  const iconsGridStates: Ref<FilterIconsGridStates> = useFilterIconsGridStates();
  const itemIndex: number = iconsGridStates.value[dataType].findIndex(
    item => item.id === id,
  );
  const iconsGridItem = iconsGridStates.value[dataType][itemIndex];

  if (iconsGridStates.value[dataType].length === 0 || !iconsGridItem) {
    return;
  }

  if (active) {
    iconsGridStates.value[dataType][itemIndex] = FilterIconsGridUtils.onItemSelected(iconsGridItem);
  }
  else {
    iconsGridStates.value[dataType][itemIndex] = FilterIconsGridUtils.onItemUnselected(iconsGridItem);
  }
};

export const useResetFilterIconsGridStates = (): void => {
  const iconsGridStates: Ref<FilterIconsGridStates> = useFilterIconsGridStates();
  iconsGridStates.value.allergens = [];
};
