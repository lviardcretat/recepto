import type { SerializeObject } from 'nitropack';
import type { Prisma, User } from '@prisma/client';
import type { DataType } from './enums';

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
 * @description Recipe model including ingredients
 * @type RecipeWithIngredients
 */
export type RecipeWithIngredients = Prisma.RecipeGetPayload<{
	include: { ingredients: true };
}>;

/**
 * @description Recipe custom model
 * @type Recipe
 */
export type Recipe = {
	id: number;
	name: string;
	peopleNumber: number;
	cookingTime: number | null;
	preparationTime: number | null;
	restTime: number | null;
	description: string | null;
	seasonId: number;
	createdAt: Date | null;
	createdBy: User | null;
};

/**
 * @description Table of recipes custom model, used to display the list of recipes
 * @type Recipes
 */
export type Recipes = {
	recipes: Recipe[];
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
		| SerializeObject<RecipesCategories>[]
		| SerializeObject<Recipes>[]
		| null;
};

/**
 * @description Number of selected filters, wanted or not wanted
 * @type FilterSelectItem
 */
export type FilterSelectItem = {
	wanted: number[];
	notWanted: number[];
};

/**
 * @description RecipesCategories custom model
 * @type RecipesCategories
 */
export type RecipesCategories = {
	id: number;
	name: string;
	createdById: number | null;
	createdAt: Date;
	updatedAt: Date | null;
};
