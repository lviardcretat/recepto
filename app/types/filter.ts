import type { SelectMenuItem } from '@nuxt/ui';
import type {
  FilterSelectMenuStatesType,
  FilterAccordionsSlots,
  FilterIconsGridStatesType,
  FilterAccordionsDataType,
} from '../enums/filter';

/* --------------- Fetching part --------------- */

export type FilterResults = {
  recipesCategories: RecipesCategoriesWithLessData[];
  recipes: RecipeWithLessData[];
};

/**
 * @description Recipe custom model
 * @type RecipeWithLessData
 */
export type RecipeWithLessData = {
  id: number;
  name: string;
  peopleNumber: number;
  cookingTime: number | null;
  preparationTime: number | null;
  restTime: number | null;
  description: string | null | undefined;
  seasonId: number;
  createdAt: string;
};

/**
 * @description RecipesCategories custom model with less data
 * @type RecipesCategoriesWithLessData
 */
export type RecipesCategoriesWithLessData = {
  id: number;
  name: string;
  count: number;
};

export type FethRecipesCategoriesQuery = {
  ingredients: ItemsIdsWantedOrNot;
  ustensils: ItemsIdsWantedOrNot;
  mealTypes: ItemsIdsWantedOrNot;
  dishTypes: ItemsIdsWantedOrNot;
  allergens: number[];
  seasonalRecipes: boolean;
};

export type FethRecipesQuery = {
  ingredients: ItemsIdsWantedOrNot;
  ustensils: ItemsIdsWantedOrNot;
  allergens: number[];
  seasonalRecipes: boolean;
  recipeCategoryId: string | string[];
};

/* --------------- SelectMenu part --------------- */

/**
 * @description Item in the custom select component wanted or not
 * @type ItemsWantedOrNot
 */
export type ItemsIdsWantedOrNot = {
  wanted: number[];
  notWanted: number[];
};

export type FilterSelectMenuStates = {
  ingredients: (SelectMenuItem & CustomSelectMenuItem)[];
  ustensils: (SelectMenuItem & CustomSelectMenuItem)[];
  mealTypes: (SelectMenuItem & CustomSelectMenuItem)[];
  dishTypes: (SelectMenuItem & CustomSelectMenuItem)[];
};

/**
 * @description Item in the custom select component
 * @type SelectItem
 */
export type CustomSelectMenuItem = {
  id: number;
  wanted: boolean;
  notWanted: boolean;
  dataType: FilterSelectMenuStatesType;
};

/**
 * @description Data present in all bdd models
 * @type GeneralData
 */
export type GeneralSelectMenuData = {
  id: number;
  name: string;
};

/* --------------- IconsGrid part --------------- */

/**
 * @description Icon/item in the icons grid component
 * @type IconsGridItem
 */
export type IconsGridItem = {
  id: number;
  label: string;
  icon: string;
  active: boolean;
  dataType: FilterIconsGridStatesType;
};

export type FilterIconsGridStates = {
  allergens: IconsGridItem[];
};

/**
 * @description Data present in all bdd models
 * @type GeneralData
 */
export type GeneralIconsGridData = {
  id: number;
  name: string;
  icon: string | null;
};

/* --------------- Switch part --------------- */

export type FilterSwitchStates = {
  seasonalRecipes: boolean;
};

/* --------------- Accordion part --------------- */

export type CustomAccordionItem = {
  dataType?: FilterAccordionsDataType;
  itemSlot?: FilterAccordionsSlots;
};
