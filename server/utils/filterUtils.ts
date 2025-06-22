import {
	lte,
	gte,
	type SQL,
	inArray,
	notInArray,
	eq,
	count,
} from 'drizzle-orm';
import type { SQLiteColumn } from 'drizzle-orm/sqlite-core';
import type { ItemsIdsWantedOrNot } from '~/types/filter';
import type { FilterSelectItem } from '~/schemas/filter';

export const recipeCategorySelectType = {
	id: tables.recipesCategory.id,
	name: tables.recipesCategory.name,
	count: count(tables.recipe.id),
};
export const recipeSelectType = {
	id: tables.recipe.id,
	name: tables.recipe.name,
	peopleNumber: tables.recipe.peopleNumber,
	cookingTime: tables.recipe.cookingTime,
	preparationTime: tables.recipe.preparationTime,
	restTime: tables.recipe.restTime,
	description: tables.recipe.description,
	seasonId: tables.recipe.seasonId,
	createdAt: tables.recipe.createdAt,
};

/**
 * Checks if all the filters lists are empty or undefined
 *
 * @param filtersListsIds - All the filters lists
 *
 * @returns True if all the filters lists are empty
 */
export function areAllEmpty(...filtersListsIds: FilterSelectItem[]): boolean {
	return filtersListsIds.every(
		(list) =>
			(list.wanted === undefined || list.wanted.length === 0) &&
			(list.notWanted === undefined || list.notWanted.length === 0),
	);
}

export async function createIngredientSubQuery(
	ingredientsIds: ItemsIdsWantedOrNot,
	recipeCategoryId: number | null = null,
) {
	const conditions = createSubQueryConditions(
		ingredientsIds,
		tables.recipeIngredient.ingredientId,
	);
	if (!conditions) return null;
	if (recipeCategoryId)
		conditions.push(eq(tables.recipesCategory.id, recipeCategoryId));
	return await useDrizzle()
		.select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
		.from(tables.recipesCategory)
		.innerJoin(
			tables.recipe,
			eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
		)
		.innerJoin(
			tables.recipeIngredient,
			eq(tables.recipeIngredient.recipeId, tables.recipe.id),
		)
		.where(and(...conditions))
		.groupBy(tables.recipesCategory.id, tables.recipe.id)
		.having(
			ingredientsIds.wanted.length > 0
				? sql`count(distinct ${tables.recipeIngredient.ingredientId}) > ${ingredientsIds.wanted.length - 1}`
				: undefined,
		);
}

export async function createUstensilSubQuery(
	ustensilsIds: ItemsIdsWantedOrNot,
	recipeCategoryId: number | null = null,
) {
	const conditions = createSubQueryConditions(
		ustensilsIds,
		tables.recipeToUstensil.ustensilId,
	);
	if (!conditions) return null;
	if (recipeCategoryId)
		conditions.push(eq(tables.recipesCategory.id, recipeCategoryId));
	return await useDrizzle()
		.select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
		.from(tables.recipesCategory)
		.innerJoin(
			tables.recipe,
			eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
		)
		.innerJoin(
			tables.recipeToUstensil,
			eq(tables.recipeToUstensil.recipeId, tables.recipe.id),
		)
		.where(and(...conditions))
		.groupBy(tables.recipesCategory.id, tables.recipe.id)
		.having(
			ustensilsIds.wanted.length > 0
				? sql`count(distinct ${tables.recipeToUstensil.ustensilId}) > ${ustensilsIds.wanted.length - 1}`
				: undefined,
		);
}

export async function createAllergenSubQuery(
	allergensIds: number[],
	recipeCategoryId: number | null = null,
) {
	const conditions = createSubQueryConditions(
		allergensIds,
		tables.allergenToRecipe.allergenId,
	);
	if (!conditions) return null;
	if (recipeCategoryId)
		conditions.push(eq(tables.recipesCategory.id, recipeCategoryId));
	return await useDrizzle()
		.select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
		.from(tables.recipesCategory)
		.innerJoin(
			tables.recipe,
			eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
		)
		.innerJoin(
			tables.allergenToRecipe,
			eq(tables.allergenToRecipe.recipeId, tables.recipe.id),
		)
		.where(and(...conditions))
		.groupBy(tables.recipesCategory.id, tables.recipe.id)
		.having(
			allergensIds.length > 0
				? sql`count(distinct ${tables.allergenToRecipe.allergenId}) > ${allergensIds.length - 1}`
				: undefined,
		);
}

export async function createSeasonalRecipeSubQuery(
	seasonalRecipes: boolean,
	recipeCategoryId: number | null = null,
) {
	if (!seasonalRecipes) return null;
	const conditions = [];
	if (recipeCategoryId)
		conditions.push(eq(tables.recipesCategory.id, recipeCategoryId));
	conditions.push(lte(tables.season.start, dateIntoDayNumber()));
	conditions.push(gte(tables.season.end, dateIntoDayNumber()));
	return await useDrizzle()
		.select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
		.from(tables.recipesCategory)
		.innerJoin(
			tables.recipe,
			eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
		)
		.innerJoin(tables.season, eq(tables.season.id, tables.recipe.seasonId))
		.where(and(...conditions))
		.groupBy(tables.recipesCategory.id, tables.recipe.id);
}

export function createSubQueryConditions<T extends SQLiteColumn>(
	ids: ItemsIdsWantedOrNot | number[],
	sqliteColumn: T,
): SQL[] | null {
	const conditions: SQL[] = [];
	if (Array.isArray(ids)) {
		// If we're dealing with an icon filter like for allegens
		if (ids.length > 0) {
			conditions.push(inArray(sqliteColumn, ids));
		}
	} else {
		// If we have to deal with a filter through a select
		if (ids.wanted.length > 0) {
			conditions.push(inArray(sqliteColumn, ids.wanted));
		}
		if (ids.notWanted.length > 0) {
			conditions.push(notInArray(sqliteColumn, ids.notWanted));
		}
		if (conditions.length === 0) {
			return null;
		}
	}
	return conditions;
}
