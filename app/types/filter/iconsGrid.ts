import type { FilterIconsGridStatesType } from '~/enums/filter';

/**
 * Icon/item in the icons grid component
 */
export interface IIconsGridItem {
  id: number;
  label: string;
  icon: string;
  active: boolean;
  dataType: FilterIconsGridStatesType;
}

/**
 * Data present in all bdd models for icons grid
 */
export interface IGeneralIconsGridData {
  id: number;
  name: string;
  icon: string | null;
}

/**
 * State of filter icons grid
 */
export type FilterIconsGridStates = {
  allergens: IIconsGridItem[];
};
