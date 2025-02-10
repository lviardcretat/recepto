import type { RecipesCategoriesFilter } from '~/global/validationSchemas';
import type { RecipesCategory, RecipesCategoryInsert } from '../utils/drizzle';
import { exists, gte, inArray, like, lte, not } from 'drizzle-orm';

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
	const recipesCategories = await useDrizzle()
		.select({
			id: tables.recipesCategory.id,
			name: tables.recipesCategory.name,
			recipes: {
				id: tables.recipe.id,
				name: tables.recipe.name,
			},
		})
		.from(tables.recipesCategory)
		.leftJoin(
			tables.recipe,
			eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
		)
		.where(
			or(
				like(tables.recipesCategory.name, `%${name}%`),
				exists(
					useDrizzle()
						.select()
						.from(tables.recipe)
						.where(
							and(
								eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
								like(tables.recipe.name, `%${name}%`),
							),
						),
				),
			),
		)
		.all();
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
	const ingredientsIds = query.ingredients;
	const ustensilsIds = query.ustensils;
	const mealTypesIds = query.mealTypes ?? { wanted: [], notWanted: [] };
	const dishTypesIds = query.dishTypes ?? { wanted: [], notWanted: [] };
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

	const conditions = [
		...(mealTypesIds
			? [
					exists(
						useDrizzle()
							.select()
							.from(tables.mealType)
							.where(
								and(
									eq(
										tables.mealType.id,
										tables.mealTypeToRecipeCategory.mealTypeId,
									),
									inArray(tables.mealType.id, ingredientsIds.wanted),
								),
							),
					),
				]
			: []),
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

	const recipesCategories = await useDrizzle()
		.select()
		.from(tables.recipesCategory)
		.leftJoin(tables.recipe, eq(tables.recipe.id, tables.recipesCategory.id))
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
		.leftJoin(
			tables.mealTypeToRecipeCategory,
			eq(
				tables.mealTypeToRecipeCategory.recipeCategoryId,
				tables.recipesCategory.id,
			),
		)
		.leftJoin(
			tables.mealType,
			eq(tables.mealType.id, tables.mealTypeToRecipeCategory.mealTypeId),
		)
		.leftJoin(tables.user, eq(tables.user.id, tables.recipe.createdById))
		.where(and(...conditions))
		.all();
	return recipesCategories;
}
