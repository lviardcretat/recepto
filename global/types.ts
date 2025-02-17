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
	createdAt: string;
	userFirstname: string | null;
	userLastname: string | null;
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
		| SerializeObject<RecipeWithLessData>[]
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

/**
 * @description Data present in all bdd models
 * @type GeneralData
 */
export type GeneralData = {
	id: number;
	name: string;
};

/**
 * @description Recipes searched type return
 * @type RecipeDetail
 */
export type RecipeSearched = {
	id: number;
	name: string;
	recipes: {
		id: number;
		name: string;
	}[];
};

/**
 * @description Recipe custom model with all data needed for card details
 * @type RecipeDetail
 */
export type RecipeDetail = {
	id: number;
	name: string;
	peopleNumber: number | null;
	cookingTime: number | null;
	preparationTime: number | null;
	restTime: number | null;
	description: string | null;
	tips: string | null;
	seasonId: number;
	createdAt: string;
	allergens: { allergen: { name: string } }[];
	ingredients: {
		quantity: number;
		ingredient: { name: string };
		unit: { shortForm: string };
	}[];
	sequences: { id: number; description: string; title: string }[];
	ustensils: { ustensil: { name: string } }[];
	createdBy: { firstname: string; lastname: string };
};
