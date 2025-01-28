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
 * @description Ingredient model including seasonal months and foodType
 * @type IngredientsSeasonal
 */
export type IngredientsSeasonal = Prisma.IngredientGetPayload<{
	select: {
		name: true;
		seasonalMonths: true;
		foodType: { select: { name: true } };
	};
}>;

/**
 * @description Recipe model including ingredients
 * @type RecipeWithIngredients
 */
export type RecipeWithIngredients = Prisma.RecipeGetPayload<{
	include: { ingredients: true };
}>;

/**
 * @description Recipe model including ingredients
 * @type RecipeWithIngredients
 */
export type Recipe = Prisma.RecipeGetPayload<{
	include: {
		ingredients: {
			select: {
				ingredient: {
					select: {
						name: true;
					};
				};
				unit: {
					select: {
						shortForm: true;
					};
				};
				quantity: true;
			};
		};
		allergens: true;
		ustensils: true;
		season: true;
		sequences: true;
		createdBy: {
			select: {
				firstname: true;
				lastname: true;
			};
		};
	};
}>;

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
		| SerializeObject<RecipesCategories>[]
		| SerializeObject<RecipesWithLessData>[]
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
	dishTypeId: number;
	createdById: number | null;
	createdAt: Date;
	updatedAt: Date | null;
};
