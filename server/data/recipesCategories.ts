import type { RecipesCategoriesFilter } from '~/global/validationSchemas';
import type { RecipesCategory, RecipesCategoryInsert } from '../utils/drizzle';
import { inArray, notInArray, type SQL } from 'drizzle-orm';
import type { ItemsIdsWantedOrNot } from '~/global/types';
import { intersect, type SQLiteColumn } from 'drizzle-orm/sqlite-core';

export async function postRecipesCategory(
	name: string,
	dishTypeId: number,
	createdById: number,
) {
	const recipesCategoryInsert: RecipesCategoryInsert = {
		name: name,
		dishTypeId: dishTypeId,
		createdById: createdById,
	};
	const recipesCategory: RecipesCategory = await useDrizzle()
		.insert(tables.recipesCategory)
		.values(recipesCategoryInsert)
		.returning()
		.get();
	return recipesCategory;
}

export async function getRecipesCategories(): Promise<RecipesCategory[]> {
	const recipesCategories: RecipesCategory[] = await useDrizzle()
		.select()
		.from(tables.recipesCategory)
		.all();
	return recipesCategories;
}

export async function getRecipesCategoriesAndRecipesNames(name: string) {
	const recipesCategories = await useDrizzle().query.recipesCategory.findMany({
		columns: {
			id: true,
			name: true,
		},
		where: (recipesCategory, { like }) =>
			like(recipesCategory.name, `%${name}%`),
		with: {
			recipes: {
				columns: {
					id: true,
					name: true,
				},
				where: (recipes, { like }) => like(recipes.name, `%${name}%`),
			},
		},
	});
	return recipesCategories;
}

export async function getRecipesCategoryName(
	id: number,
): Promise<{ name: string } | undefined> {
	const recipesCategory: { name: string } | undefined = await useDrizzle()
		.select({
			name: tables.recipesCategory.name,
		})
		.from(tables.recipesCategory)
		.where(eq(tables.ingredient.id, id))
		.get();
	return recipesCategory;
}

export async function getRecipesCategory(
	id: number,
): Promise<RecipesCategory | undefined> {
	const recipesCategory: RecipesCategory | undefined = await useDrizzle()
		.select()
		.from(tables.recipesCategory)
		.where(eq(tables.ingredient.id, id))
		.get();
	return recipesCategory;
}

export async function getRecipesCategoriesFiltered(
	query: RecipesCategoriesFilter,
) {
	const ingredientsIds: ItemsIdsWantedOrNot = query.ingredients;
	const ustensilsIds: ItemsIdsWantedOrNot = query.ustensils;
	const mealTypesIds: ItemsIdsWantedOrNot = query.mealTypes ?? {
		wanted: [],
		notWanted: [],
	};
	const dishTypesIds: ItemsIdsWantedOrNot = query.dishTypes ?? {
		wanted: [],
		notWanted: [],
	};
	const seasonalRecipes: boolean = query.seasonalRecipes === true;
	const allergensIds: number[] = query.allergens;

	// If all the filters lists are empty, return all the recipes without any filter
	if (
		areAllEmpty(ingredientsIds, ustensilsIds, mealTypesIds, dishTypesIds) &&
		allergensIds?.length === 0 &&
		!seasonalRecipes
	) {
		return await getRecipesCategories();
	}

	const filters = [];
	const mealTypeSubQuery = createMealTypeSubQuery(mealTypesIds);
	const dishTypeSubQuery = createDishTypeSubQuery(dishTypesIds);
	const ingredientSubQuery = createIngredientSubQuery(ingredientsIds);
	const ustensilSubQuery = createUstensilSubQuery(ustensilsIds);
	const allergenSubQuery = createAllergenSubQuery(allergensIds);
	if (mealTypeSubQuery) filters.push(mealTypeSubQuery);
	if (dishTypeSubQuery) filters.push(dishTypeSubQuery);
	if (ingredientSubQuery) filters.push(ingredientSubQuery);
	if (ustensilSubQuery) filters.push(ustensilSubQuery);
	if (allergenSubQuery) filters.push(allergenSubQuery);

	let recipesCategories: { name: string }[] = [];

	// conditions due to the limitations of the intersect function, which requires specifically two parameters
	if (filters.length > 2) {
		recipesCategories = await intersect(
			filters[0],
			filters[1],
			...filters.slice(2),
		).all();
	} else if (filters.length === 2) {
		recipesCategories = await intersect(filters[0], filters[1]).all();
	} else if (filters.length === 1) {
		recipesCategories = await filters[0]
			// Dynamic query building to instantiate several where in a single query
			.$dynamic()
			.groupBy(tables.recipesCategory.id)
			.all();
	}

	console.log(recipesCategories);
	return recipesCategories;
}

function createMealTypeSubQuery(mealTypesIds: ItemsIdsWantedOrNot) {
	const conditions = createSubQueryConditions(
		mealTypesIds,
		tables.mealTypeToRecipeCategory.mealTypeId,
	);
	if (!conditions) return null;
	return useDrizzle()
		.select({ name: tables.recipesCategory.name })
		.from(tables.recipesCategory)
		.innerJoin(
			tables.mealTypeToRecipeCategory,
			eq(
				tables.mealTypeToRecipeCategory.recipeCategoryId,
				tables.recipesCategory.id,
			),
		)
		.innerJoin(
			tables.mealType,
			eq(tables.mealType.id, tables.mealTypeToRecipeCategory.mealTypeId),
		)
		.where(and(...conditions))
		.groupBy(tables.recipesCategory.id, tables.mealType.id)
		.having(
			mealTypesIds.wanted.length > 0
				? sql`count(distinct ${tables.mealTypeToRecipeCategory.mealTypeId}) > ${mealTypesIds.wanted.length - 1}`
				: undefined,
		);
}

function createDishTypeSubQuery(dishTypesIds: ItemsIdsWantedOrNot) {
	const conditions = createSubQueryConditions(dishTypesIds, tables.dishType.id);
	if (!conditions) return null;
	return useDrizzle()
		.select({ name: tables.recipesCategory.name })
		.from(tables.recipesCategory)
		.innerJoin(
			tables.dishType,
			eq(tables.dishType.id, tables.recipesCategory.dishTypeId),
		)
		.where(and(...conditions))
		.groupBy(tables.recipesCategory.id);
}

function createIngredientSubQuery(ingredientsIds: ItemsIdsWantedOrNot) {
	const conditions = createSubQueryConditions(
		ingredientsIds,
		tables.recipeIngredient.ingredientId,
	);
	if (!conditions) return null;
	return useDrizzle()
		.select({ name: tables.recipesCategory.name })
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

function createUstensilSubQuery(ustensilsIds: ItemsIdsWantedOrNot) {
	const conditions = createSubQueryConditions(
		ustensilsIds,
		tables.recipeToUstensil.ustensilId,
	);
	if (!conditions) return null;
	return useDrizzle()
		.select({ name: tables.recipesCategory.name })
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

function createAllergenSubQuery(allergensIds: number[]) {
	const conditions = createSubQueryConditions(
		allergensIds,
		tables.allergenToRecipe.allergenId,
	);
	if (!conditions) return null;
	return useDrizzle()
		.select({ name: tables.recipesCategory.name })
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

function createSubQueryConditions<T extends SQLiteColumn>(
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
