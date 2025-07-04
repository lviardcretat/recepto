import type { SelectMenuItem } from '@nuxt/ui';
import { FilterSelectMenuStatesType } from '~/enums/filter';
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
	id: number,
	wanted: boolean | null,
	dataType: FilterSelectMenuStatesType,
): Promise<void> => {
	const truc: SelectMenuItem & CustomSelectMenuItem = {
		id: 1,
		label: '',
		notWanted: false,
		wanted: true,
		dataType: FilterSelectMenuStatesType.INGREDIENT,
	};
	truc.label;
	if (id <= 0) {
		return;
	}
	const selectMenuStates: Ref<FilterSelectMenuStates> =
		useFilterSelectMenuStates();
	const itemIndex: number = selectMenuStates.value[dataType].findIndex(
		(item) => item.id === id,
	);
	const selectMenuItem: (SelectMenuItem & CustomSelectMenuItem) | undefined =
		selectMenuStates.value[dataType][itemIndex];

	if (selectMenuStates.value[dataType].length === 0 || !selectMenuItem) {
		return;
	}

	selectMenuStates.value[dataType][itemIndex] =
		FilterSelectMenuUtils.getUpdatedItemOnFilterButtonClick(
			wanted,
			selectMenuItem,
		);
};

export const useUpdateFilterSelectedMenu = async (
	item: SelectMenuItem & CustomSelectMenuItem,
	wanted: boolean | null,
	dataType: FilterSelectMenuStatesType,
): Promise<void> => {
	if (item.id <= 0) {
		return;
	}
	const selectedMenuStates: Ref<FilterSelectMenuStates> =
		useFilterSelectedItemsStates();
	const itemIndex: number = selectedMenuStates.value[dataType].findIndex(
		(_item) => _item.id === item.id,
	);
	const selectedMenuItem: (SelectMenuItem & CustomSelectMenuItem) | undefined =
		selectedMenuStates.value[dataType][itemIndex];

	if (!selectedMenuItem) {
		selectedMenuStates.value[dataType].push(item);
	} else {
		selectedMenuStates.value[dataType][itemIndex] =
			FilterSelectMenuUtils.getUpdatedItemOnFilterButtonClick(
				wanted,
				selectedMenuItem,
			);
	}
};
