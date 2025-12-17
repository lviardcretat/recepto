import type { SelectMenuItem } from '@nuxt/ui';
import type { FilterSelectMenuStatesType } from '~/enums/filter';

/**
 * Item in the custom select component
 */
export interface ICustomSelectMenuItem {
  id: number;
  wanted: boolean;
  notWanted: boolean;
  dataType: FilterSelectMenuStatesType;
}

/**
 * Data present in all bdd models for select menu
 */
export interface IGeneralSelectMenuData {
  id: number;
  name: string;
}

/**
 * State of filter select menus
 */
export type FilterSelectMenuStates = {
  ingredients: (SelectMenuItem & ICustomSelectMenuItem)[];
  ustensils: (SelectMenuItem & ICustomSelectMenuItem)[];
  mealTypes: (SelectMenuItem & ICustomSelectMenuItem)[];
  dishTypes: (SelectMenuItem & ICustomSelectMenuItem)[];
};
