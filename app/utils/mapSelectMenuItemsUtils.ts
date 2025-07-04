import type { SelectMenuItem } from '@nuxt/ui';
import type { GeneralSelectMenuData } from '../types/filter';

/**
 * Transforms the data received by the bdd to match the type required by the component SelectMenu.
 * @param newItems The filter list to map.
 */
export default function<T extends GeneralSelectMenuData>(newItems: T[] | null): SelectMenuItem[] {
  if (newItems == null || newItems.length === 0) {
    return [];
  }
  const items: SelectMenuItem[] = newItems.map((item: T) => {
    return {
      id: item.id,
      label: item.name,
      type: 'item',
    };
  });
  return items;
}
