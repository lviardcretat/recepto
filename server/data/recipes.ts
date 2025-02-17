import type {
	FilterSelectItem,
	RecipesFilter,
} from '~/global/validationSchemas';
import type {
	AllergenToRecipe,
	Recipe,
	RecipeInsert,
	RecipeToUstensil,
} from '../utils/drizzle';
import { dateIntoDayNumber, QueryToNumber } from '../utils/number';
import { exists, gte, inArray, lte, not } from 'drizzle-orm';
import { areAllEmpty, createAllergenSubQuery, createIngredientSubQuery, createSeasonalRecipeSubQuery, createUstensilSubQuery, recipeSelectType } from '../utils/filter';
import { RecipesCategoriesWithLessData } from '~/global/types';
import { intersect } from 'drizzle-orm/sqlite-core';

export async function postRecipe(
	name: string,
	description: string,
	tips: string | undefined,
	peopleNumber: number,
	preparationTime: number,
	cookingTime: number,
	restTime: number,
	seasonId: number,
	recipesCategoryId: number,
	allergensIds: number[],
	ustensilIds: number[],
	createdById: number,
): Promise<Recipe> {
	const recipeInsert: RecipeInsert = {
		name: name,
		description: description,
		tips: tips,
		peopleNumber: peopleNumber,
		preparationTime: preparationTime,
		cookingTime: cookingTime,
		restTime: restTime,
		seasonId: seasonId,
		recipesCategoryId: recipesCategoryId,
		createdById: createdById,
	};
	const recipe: Recipe = await useDrizzle()
		.insert(tables.recipe)
		.values(recipeInsert)
		.returning()
		.get();

	for (const ustensilId of ustensilIds) {
		const recipeToUstensil: RecipeToUstensil = {
			recipeId: recipe.id,
			ustensilId: ustensilIds[ustensilId],
		};
		await useDrizzle()
			.insert(tables.recipeToUstensil)
			.values(recipeToUstensil)
			.returning()
			.get();
	}
	for (const allergensId of allergensIds) {
		const allergenToRecipe: AllergenToRecipe = {
			recipeId: recipe.id,
			allergenId: allergensIds[allergensId],
		};
		await useDrizzle()
			.insert(tables.allergenToRecipe)
			.values(allergenToRecipe)
			.returning()
			.get();
	}
	return recipe;
}

export async function getRecipes(): Promise<Recipe[]> {
	const recipes: Recipe[] = await useDrizzle()
		.select()
		.from(tables.recipe)
		.all();
	return recipes;
}

// TODO à voir
export async function getRecipe(id: number) {
	const recipes = await useDrizzle()
		.select({
			id: tables.recipe.id,
			name: tables.recipe.name,
			// Ingredients
			ingredientId: tables.recipeIngredient.id,
			ingredientName: tables.ingredient.name,
			unitShortForm: tables.unit.shortForm,
			quantity: tables.recipeIngredient.quantity,
			// Allergens
			allergenId: tables.allergen.id,
			allergenName: tables.allergen.name,
			allergenIcon: tables.allergen.icon,
			// Ustensils
			ustensilId: tables.ustensil.id,
			ustensilName: tables.ustensil.name,
			// Sequences
			sequenceId: tables.sequence.id,
			sequenceTitle: tables.sequence.title,
			sequenceDescription: tables.sequence.description,
			// CreatedBy
			createdByFirstname: tables.user.firstname,
			createdByLastname: tables.user.lastname,
		})
		.from(tables.recipe)
		.leftJoin(
			tables.recipeIngredient,
			eq(tables.recipeIngredient.recipeId, tables.recipe.id),
		)
		.leftJoin(
			tables.ingredient,
			eq(tables.ingredient.id, tables.recipeIngredient.ingredientId),
		)
		.leftJoin(
			tables.allergenToRecipe,
			eq(tables.allergenToRecipe.recipeId, tables.recipe.id),
		)
		.leftJoin(
			tables.allergen,
			eq(tables.allergen.id, tables.allergenToRecipe.allergenId),
		)
		.leftJoin(
			tables.recipeToUstensil,
			eq(tables.recipe.id, tables.recipeToUstensil.recipeId),
		)
		.leftJoin(
			tables.ustensil,
			eq(tables.ustensil.id, tables.recipeToUstensil.ustensilId),
		)
		.leftJoin(tables.sequence, eq(tables.sequence.recipeId, tables.recipe.id))
		.leftJoin(tables.user, eq(tables.user.id, tables.recipe.createdById))
		.where(eq(tables.recipe.id, id))
		.all();
	return recipes;
}

export async function getRecipesWithoutFilter(recipeCategoryId: number) {
	const recipes = await useDrizzle()
		.select(recipeSelectType)
		.from(tables.recipe)
		.leftJoin(
			tables.recipesCategory,
			eq(tables.recipesCategory.id, tables.recipe.recipesCategoryId),
		)
		.where(eq(tables.recipesCategory.id, recipeCategoryId))
		.all();
	console.log('---------------------')
	console.log(recipes)
	return recipes;
}

export async function getRecipesFiltered(query: RecipesFilter) {
	const ingredientsIds = query.ingredients;
	const ustensilsIds = query.ustensils;
	const seasonalRecipes = query.seasonalRecipes === true;
	const allergensIds = query.allergens;
	const recipeCategoryId = query.recipeCategoryId;

	if (
		!(
			ingredientsIds.wanted &&
			ingredientsIds.notWanted &&
			ustensilsIds.wanted &&
			ustensilsIds.notWanted &&
			allergensIds &&
			recipeCategoryId
		)
	) {
		throw createError({
			statusCode: 404,
			statusMessage: 'Specific recipe query filter unvalid',
		});
	}

	if (
		areAllEmpty(ingredientsIds, ustensilsIds) &&
		allergensIds?.length === 0 &&
		!seasonalRecipes
	) {
		// If all the filters lists are empty, return all the recipes without any filter
		return [
			{
				...(await getRecipesWithoutFilter(recipeCategoryId)),
			},
		];
	}

	let recipes = [];
	const subQueries = [
		createIngredientSubQuery(ingredientsIds, recipeCategoryId),
		createUstensilSubQuery(ustensilsIds, recipeCategoryId),
		createAllergenSubQuery(allergensIds, recipeCategoryId),
		createSeasonalRecipeSubQuery(seasonalRecipes, recipeCategoryId),
	];
	const filters: any[] = [];

	for(let subQuery of subQueries) {
		if(subQuery) filters.push(subQuery);
	}

	// conditions due to the limitations of the intersect function, which requires specifically two parameters
	if (filters.length > 2) {
		recipes = await intersect(
			filters[0],
			filters[1],
			...filters.slice(2)
		).all() as unknown as RecipesCategoriesWithLessData[];
	} else if (filters.length === 2) {
		recipes = await intersect(filters[0], filters[1]).all() as unknown as RecipesCategoriesWithLessData[];
	} else if (filters.length === 1) {
		recipes = await filters[0]
			// Dynamic query building to instantiate several where in a single query
			.$dynamic()
			.groupBy(tables.recipe.id)
			.all();
	}

	console.log(recipes);

	return recipes;
}
