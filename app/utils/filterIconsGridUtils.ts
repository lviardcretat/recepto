import type { FilterIconsGridStatesType } from '~/enums/filter';
import type { GeneralIconsGridData, IconsGridItem } from '~/types/filter';

const FilterIconsGridUtils = {
/**
 * Updates the filter if the user on active item.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
  onItemSelected: (item: IconsGridItem): IconsGridItem => {
    item.active = true;
    return item;
  },

  /**
 * Updates the filter if the user on non active item.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
  onItemUnselected: (item: IconsGridItem): IconsGridItem => {
    item.active = false;
    return item;
  },

  /**
 * Extracts all active elements from one of the filters list.
 * @param items The list of one of the filters.
 * @returns A table of active elements of the list of one of the filters.
 */
  getActiveIconsGridItemsIds: (items: IconsGridItem[]): number[] => {
    const truc = items.filter((item: IconsGridItem) => {
      return item.active;
    }).map((item: IconsGridItem) => {
      return item.id;
    });
    return truc;
  },

  /**
 * Transforms the data received by the bdd to match the type required by the component IconsGrid.
 * @param newItems The filter list to map.
 * @param dataType The icon of the filter item.
 * @param dataType The type of the filter list modified.
 * @returns The mapped filter list.
 */
  mapIconsGridItems: <T extends GeneralIconsGridData>(
    newItems: T[] | null,
    oldItems: IconsGridItem[],
    dataType: FilterIconsGridStatesType,
  ): IconsGridItem[] => {
    if (newItems == null || newItems.length === 0) {
      return [];
    }
    const items: IconsGridItem[] = newItems.map((item: T) => {
      const existingItem = oldItems.find(oldItem => oldItem.id === item.id);
      return {
        id: item.id,
        label: item.name,
        icon: item.icon ?? '',
        active: existingItem ? existingItem.active : false,
        dataType: dataType,
      };
    });
    return items;
  },
};

export { FilterIconsGridUtils };
