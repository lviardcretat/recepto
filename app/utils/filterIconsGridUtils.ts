import type { FilterIconsGridStatesType } from '~/enums/filter';
import type { IGeneralIconsGridData, IIconsGridItem } from '~/types/filter/iconsGrid';

const FilterIconsGridUtils = {
/**
 * Updates the filter if the user on active item.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
  onItemSelected: (item: IIconsGridItem): IIconsGridItem => {
    item.active = true;
    return item;
  },

  /**
 * Updates the filter if the user on non active item.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
  onItemUnselected: (item: IIconsGridItem): IIconsGridItem => {
    item.active = false;
    return item;
  },

  /**
 * Extracts all active elements from one of the filters list.
 * @param items The list of one of the filters.
 * @returns A table of active elements of the list of one of the filters.
 */
  getActiveIconsGridItemsIds: (items: IIconsGridItem[]): number[] => {
    const truc = items.filter((item: IIconsGridItem) => {
      return item.active;
    }).map((item: IIconsGridItem) => {
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
  mapIconsGridItems: <T extends IGeneralIconsGridData>(
    newItems: T[] | null,
    oldItems: IIconsGridItem[],
    dataType: FilterIconsGridStatesType,
  ): IIconsGridItem[] => {
    if (newItems == null || newItems.length === 0) {
      return [];
    }
    const items: IIconsGridItem[] = newItems.map((item: T) => {
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
