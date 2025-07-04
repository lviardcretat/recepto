import type { SelectMenuItem } from '@nuxt/ui';
import type { FilterSelectMenuStatesType } from '~/enums/filter';
import type {
  CustomSelectMenuItem,
  GeneralSelectMenuData,
  ItemsIdsWantedOrNot,
} from '~/types/filter';

const FilterSelectMenuUtils = {
/**
 * Updates the filter if the user has clicked on ‘wanted’.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
  onItemWanted: (
    item: SelectMenuItem & CustomSelectMenuItem,
  ): SelectMenuItem & CustomSelectMenuItem => {
    item.wanted = true;
    item.notWanted = false;
    return item;
  },

  /**
 * Updates the filter if the user has clicked on ‘notWanted’.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
  onItemNotWanted: (
    item: SelectMenuItem & CustomSelectMenuItem,
  ): SelectMenuItem & CustomSelectMenuItem => {
    item.wanted = false;
    item.notWanted = true;
    return item;
  },

  /**
 * Updates the filter if the user has deselected the filter.
 * @param item The modified filter.
 * @returns The modified filter updated.
 */
  onItemUnselected: (
    item: SelectMenuItem & CustomSelectMenuItem,
  ): SelectMenuItem & CustomSelectMenuItem => {
    item.wanted = false;
    item.notWanted = false;
    return item;
  },

  /**
 * When the user click on the wanted / not wanted filter button, we update the
 * item with the new wanted / not wanted values
 * @param wanted If the user has clicked on the wanted or not wanted button
 * @param selectMenuItem The item to update
 * @returns The item updated
 */
  getUpdatedItemOnFilterButtonClick: (
    wanted: boolean | null,
    selectMenuItem: SelectMenuItem & CustomSelectMenuItem,
  ) => {
    if (
      (wanted && wanted === selectMenuItem.wanted)
      || (!wanted && !wanted === selectMenuItem.notWanted)
    ) {
      return FilterSelectMenuUtils.onItemUnselected(selectMenuItem);
    }
    if (wanted) {
      return FilterSelectMenuUtils.onItemWanted(selectMenuItem);
    }
    return FilterSelectMenuUtils.onItemNotWanted(selectMenuItem);
  },

  /**
 * Extracts all the wanted and unwanted elements from one of the filters list.
 * @param items The list of one of the filters.
 * @returns A table ['wanted', 'notWanted'] of the list of one of the filters.
 */
  getWantedOrNotSelectMenuItemsIds: (
    items: (SelectMenuItem & CustomSelectMenuItem)[],
  ): ItemsIdsWantedOrNot => {
    return items.reduce(
      (
        acc: ItemsIdsWantedOrNot,
        item: SelectMenuItem & CustomSelectMenuItem,
      ) => {
        if (item.wanted) acc.wanted.push(item.id);
        if (item.notWanted) acc.notWanted.push(item.id);
        return acc;
      },
      { wanted: [], notWanted: [] },
    );
  },

  /**
 * Transforms the data received by the bdd to match the type required by the component SelectMenu.
 * @param newItems The filter list to map.
 * @param dataType The type of the filter list modified.
 * @returns The mapped filter list.
 */
  mapFilterSelectMenuItems: <T extends GeneralSelectMenuData>(
    newItems: T[] | null,
    oldItems: (SelectMenuItem & CustomSelectMenuItem)[],
    dataType: FilterSelectMenuStatesType,
  ): (SelectMenuItem & CustomSelectMenuItem)[] => {
    if (newItems == null || newItems.length === 0) {
      return [];
    }
    const items: (SelectMenuItem & CustomSelectMenuItem)[] = newItems.map(
      (item: T) => {
        const existingItem = oldItems.find(oldItem => oldItem.id === item.id);
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
  },
};

export { FilterSelectMenuUtils };
