import type { SelectMenuItem } from '@nuxt/ui';
import type { FilterSelectMenuStatesType } from '~/global/enums/filter';
import type {
	FilterSelectMenuStates,
	CustomSelectMenuItem,
	ItemsIdsWantedOrNot,
	GeneralSelectMenuData,
} from '~/global/types/filter';

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
 * Transforms the data received by the bdd to match the type required by the component SelectMenu.
 * @param newItems The filter list to map.
 * @param dataType The type of the filter list modified.
 * @returns The mapped filter list.
 */
export const useMapFilterSelectMenuItems = <T extends GeneralSelectMenuData>(
	newItems: T[] | null,
	oldItems: (SelectMenuItem & CustomSelectMenuItem)[],
	dataType: FilterSelectMenuStatesType,
): (SelectMenuItem & CustomSelectMenuItem)[] => {
	if (newItems == null || newItems.length === 0) {
		return [];
	}
	const items: (SelectMenuItem & CustomSelectMenuItem)[] = newItems.map(
		(item: T) => {
			const existingItem = oldItems.find((oldItem) => oldItem.id === item.id);
			return {
				id: item.id,
				label: item.name,
				wanted: existingItem ? existingItem.wanted : false,
				notWanted: existingItem ? existingItem.notWanted : false,
				dataType: dataType,
				type: 'item',
			};
		},
	);
	return items;
};

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
	if (id <= 0) {
		return;
	}
	const selectMenuStates = useFilterSelectMenuStates();
	const itemIndex: number = selectMenuStates.value[dataType].findIndex(
		(item) => item.id === id,
	);

	if (selectMenuStates.value[dataType].length === 0) {
		return;
	}

	if (
		(wanted && wanted === selectMenuStates.value[dataType][itemIndex].wanted) ||
		(!wanted &&
			!wanted === selectMenuStates.value[dataType][itemIndex].notWanted)
	) {
		selectMenuStates.value[dataType][itemIndex] = onItemUnselected(
			selectMenuStates.value[dataType][itemIndex],
		);
	} else if (wanted) {
		selectMenuStates.value[dataType][itemIndex] = onItemWanted(
			selectMenuStates.value[dataType][itemIndex],
		);
	} else {
		selectMenuStates.value[dataType][itemIndex] = onItemNotWanted(
			selectMenuStates.value[dataType][itemIndex],
		);
	}
};

/**
 * Extracts all the wanted and unwanted elements from one of the filters list.
 * @param items The list of one of the filters.
 * @returns A table ['wanted', 'notWanted'] of the list of one of the filters.
 */
export const useGetWantedOrNotSelectMenuItemsIds = (
	items: (SelectMenuItem & CustomSelectMenuItem)[],
): ItemsIdsWantedOrNot => {
	return items.reduce(
		(acc: ItemsIdsWantedOrNot, item: SelectMenuItem & CustomSelectMenuItem) => {
			if (item.wanted) acc.wanted.push(item.id);
			if (item.notWanted) acc.notWanted.push(item.id);
			return acc;
		},
		{ wanted: [], notWanted: [] },
	);
};

/**
 * Updates the filter if the user has clicked on ‘wanted’.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
const onItemWanted = (
	item: SelectMenuItem & CustomSelectMenuItem,
): SelectMenuItem & CustomSelectMenuItem => {
	item.wanted = true;
	item.notWanted = false;
	return item;
};

/**
 * Updates the filter if the user has clicked on ‘notWanted’.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
const onItemNotWanted = (
	item: SelectMenuItem & CustomSelectMenuItem,
): SelectMenuItem & CustomSelectMenuItem => {
	item.wanted = false;
	item.notWanted = true;
	return item;
};

/**
 * Updates the filter if the user has deselected the filter.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
const onItemUnselected = (
	item: SelectMenuItem & CustomSelectMenuItem,
): SelectMenuItem & CustomSelectMenuItem => {
	item.wanted = false;
	item.notWanted = false;
	return item;
};
