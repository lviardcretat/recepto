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
import { areAllEmpty } from '../utils/filter';

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
		.select()
		.from(tables.recipe)
		.leftJoin(
			tables.recipesCategory,
			eq(tables.recipesCategory.id, tables.recipe.recipesCategoryId),
		)
		.where(eq(tables.recipesCategory.id, recipeCategoryId))
		.all();
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

	const conditions = [
		eq(tables.recipesCategory.id, recipeCategoryId),
		...(seasonalRecipes
			? [
					exists(
						useDrizzle()
							.select()
							.from(tables.season)
							.where(
								and(
									eq(tables.season.id, tables.recipe.seasonId),
									lte(tables.season.start, dateIntoDayNumber()),
									gte(tables.season.end, dateIntoDayNumber()),
								),
							),
					),
				]
			: []),
		...(ingredientsIds.wanted.length > 0
			? [
					exists(
						useDrizzle()
							.select()
							.from(tables.recipeIngredient)
							.where(
								and(
									eq(tables.recipeIngredient.recipeId, tables.recipe.id),
									inArray(
										tables.recipeIngredient.ingredientId,
										ingredientsIds.wanted,
									),
								),
							),
					),
				]
			: []),
		not(
			exists(
				useDrizzle()
					.select()
					.from(tables.recipeIngredient)
					.where(
						and(
							eq(tables.recipeIngredient.recipeId, tables.recipe.id),
							inArray(
								tables.recipeIngredient.ingredientId,
								ingredientsIds.notWanted,
							),
						),
					),
			),
		),
		...(ustensilsIds.wanted.length > 0
			? [
					exists(
						useDrizzle()
							.select()
							.from(tables.recipeToUstensil)
							.where(
								and(
									eq(tables.recipeToUstensil.recipeId, tables.recipe.id),
									inArray(
										tables.recipeToUstensil.ustensilId,
										ustensilsIds.wanted,
									),
								),
							),
					),
				]
			: []),
		not(
			exists(
				useDrizzle()
					.select()
					.from(tables.recipeToUstensil)
					.where(
						and(
							eq(tables.recipeToUstensil.recipeId, tables.recipe.id),
							inArray(
								tables.recipeToUstensil.ustensilId,
								ustensilsIds.notWanted,
							),
						),
					),
			),
		),
		...(allergensIds.length > 0
			? [
					not(
						exists(
							useDrizzle()
								.select()
								.from(tables.allergenToRecipe)
								.where(
									and(
										eq(tables.allergenToRecipe.recipeId, tables.recipe.id),
										inArray(
											tables.allergenToRecipe.allergenId,
											QueryToNumber(allergensIds),
										),
									),
								),
						),
					),
				]
			: []),
	];

	const recipes = await useDrizzle()
		.select()
		.from(tables.recipe)
		.leftJoin(
			tables.recipesCategory,
			eq(tables.recipesCategory.id, tables.recipe.recipesCategoryId),
		)
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
		.leftJoin(tables.user, eq(tables.user.id, tables.recipe.createdById))
		.where(and(...conditions))
		.all();
	return recipes;
}
