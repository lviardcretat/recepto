import type { SelectMenuItem } from '@nuxt/ui';
import type { FilterSelectMenuStatesType } from '~/enums/filter';
import type {
  FilterSelectMenuStates,
  CustomSelectMenuItem,
} from '~/types/filter';

/**
 * Allows you to recover states from the composable.
 * @returns The list of SelectMenu filters under the states form.
 */
export const useFilterSelectMenuStates = () =>
  useState<FilterSelectMenuStates>('filterSelectMenuStates', () => ({
    ingredients: [],
    ustensils: [],
    mealTypes: [],
    dishTypes: [],
  }));

/**
 * Allows you to recover selected states from the composable.
 * @returns The list of SelectedItems filters under the states form.
 */
export const useFilterSelectedItemsStates = () =>
  useState<FilterSelectMenuStates>('filterSelectedItemsStates', () => ({
    ingredients: [],
    ustensils: [],
    mealTypes: [],
    dishTypes: [],
  }));

/**
 * Update the corresponding state according to the filter modified by the user.
 * @param id The id of the filtered item.
 * @param wanted Whether the filtered item is wanted or not.
 * @param dataType The type of the filter list modified.
 */
export const useUpdateFilterSelectMenu = async (
  item: SelectMenuItem & CustomSelectMenuItem,
  wanted: boolean | null,
  dataType: FilterSelectMenuStatesType,
): Promise<void> => {
  if (item.id <= 0) {
    return;
  }
  const selectMenuStates: Ref<FilterSelectMenuStates> = useFilterSelectMenuStates();
  const selectedMenuStates: Ref<FilterSelectMenuStates> = useFilterSelectedItemsStates();
  const selectItemIndex: number = selectMenuStates.value[dataType].findIndex(
    _item => _item.id === item.id,
  );

  if (
    selectMenuStates.value[dataType].length === 0
    || !selectMenuStates.value[dataType][selectItemIndex]
  ) {
    return;
  }

  selectMenuStates.value[dataType][selectItemIndex] = FilterSelectMenuUtils.getUpdatedItemOnFilterButtonClick(
    wanted,
    selectMenuStates.value[dataType][selectItemIndex],
  );

  selectedMenuStates.value[dataType] = selectMenuStates.value[dataType].filter(
    item => item.wanted || item.notWanted,
  );
};
