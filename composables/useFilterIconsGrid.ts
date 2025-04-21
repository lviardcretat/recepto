import type { FilterIconsGridStatesType } from '~/global/enums/filter';
import type {
	FilterIconsGridStates,
	GeneralIconsGridData,
	IconsGridItem,
} from '~/global/types/filter';

/**
 * Allows you to recover states from the composable.
 * @returns The list of IconsGrid filters under the states form.
 */
export const useFilterIconsGridStates = () =>
	useState<FilterIconsGridStates>('filterIconsGridStates', () => ({
		allergens: [],
	}));

/**
 * Transforms the data received by the bdd to match the type required by the component IconsGrid.
 * @param newItems The filter list to map.
 * @param dataType The icon of the filter item.
 * @param dataType The type of the filter list modified.
 * @returns The mapped filter list.
 */
export const useMapIconsGridItems = <T extends GeneralIconsGridData>(
	newItems: T[] | null,
	oldItems: IconsGridItem[],
	dataType: FilterIconsGridStatesType,
): IconsGridItem[] => {
	if (newItems == null || newItems.length === 0) {
		return [];
	}
	const items: IconsGridItem[] = newItems.map((item: T) => {
		const existingItem = oldItems.find((oldItem) => oldItem.id === item.id);
		return {
			id: item.id,
			label: item.name,
			icon: item.icon ?? '',
			active: existingItem ? existingItem.active : false,
			dataType: dataType,
		};
	});
	return items;
};

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
	const iconsGridStates = useFilterIconsGridStates();
	const itemIndex: number = iconsGridStates.value[dataType].findIndex(
		(item) => item.id === id,
	);

	if (iconsGridStates.value[dataType].length === 0) {
		return;
	}

	if (active) {
		iconsGridStates.value[dataType][itemIndex] = onItemSelected(
			iconsGridStates.value[dataType][itemIndex],
		);
	} else {
		iconsGridStates.value[dataType][itemIndex] = onItemUnselected(
			iconsGridStates.value[dataType][itemIndex],
		);
	}
};

/**
 * Updates the filter if the user on active item.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
const onItemSelected = (item: IconsGridItem): IconsGridItem => {
	item.active = true;
	return item;
};

/**
 * Updates the filter if the user on non active item.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
const onItemUnselected = (item: IconsGridItem): IconsGridItem => {
	item.active = false;
	return item;
};

/**
 * Extracts all active elements from one of the filters list.
 * @param items The list of one of the filters.
 * @returns A table of active elements of the list of one of the filters.
 */
export const useGetActiveIconsGridItemsIds = (
	items: IconsGridItem[],
): number[] => {
	return items.reduce((acc: number[], item: IconsGridItem) => {
		if (item.active) acc.push(item.id);
		return acc;
	}, []);
};
