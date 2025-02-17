import type { SerializeObject } from 'nitropack';
import type { DataType } from './enums';
import type { FilterSelectItem } from './validationSchemas';

/**
 * @description Item in the custom select component
 * @type SelectItem
 */
export type SelectItem = {
	id: number;
	name: string;
	wanted: boolean;
	notWanted: boolean;
	type: DataType;
};

/**
 * @description Item in the custom select component wanted or not
 * @type ItemsWantedOrNot
 */
export type ItemsIdsWantedOrNot = {
	wanted: number[];
	notWanted: number[];
};

/**
 * @description Icon/item in the icons grid component
 * @type IconsGridItem
 */
export type IconsGridItem = {
	id: number;
	name: string;
	icon: string;
	active: boolean;
	type: DataType;
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
	description: string | null;
	seasonId: number;
	createdAt: Date | null;
	createdBy: {
		firstname: string;
		lastname: string;
	};
};

/**
 * @description Table of recipes custom model with less data, used to display the list of recipes
 * @type Recipes
 */
export type RecipesWithLessData = {
	recipes: RecipeWithLessData[];
};

/**
 * @description Filter store state
 * @type State
 */
export type State = {
	filterNumber: number;
	ustensils: FilterSelectItem;
	ingredients: FilterSelectItem;
	mealTypes: FilterSelectItem;
	dishTypes: FilterSelectItem;
	seasonalRecipes: boolean;
	allergens: number[];
	recipeCategoryList:
		| SerializeObject<RecipesCategoriesWithLessData>[]
		| SerializeObject<RecipesWithLessData>[]
		| null;
};

/**
 * @description RecipesCategories custom model with less data
 * @type RecipesCategoriesWithLessData
 */
export type RecipesCategoriesWithLessData = {
	id: number;
	name: string;
};
