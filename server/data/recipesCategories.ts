import type { RecipesCategories } from '~/global/types';
import type { RecipesCategoriesFilter } from '~/global/validationSchemas';
import type { RecipesCategory, RecipesCategoryInsert } from '../utils/drizzle';
import { exists, like } from 'drizzle-orm';

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

export async function getRecipesCategories(): Promise<RecipesCategories[]> {
	const recipesCategories: RecipesCategories[] = await useDrizzle()
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
/*
export async function getRecipesCategoriesFiltered(
	query: RecipesCategoriesFilter,
): Promise<RecipesCategories[]> {
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

	return await prisma.recipesCategory.findMany({
		where: {
			mealTypes: {
				some: {
					id: {
						...(mealTypesIds.wanted.length > 0
							? { in: mealTypesIds.wanted }
							: {}),
						notIn: mealTypesIds.notWanted,
					},
				},
			},
			dishTypeId: {
				...(dishTypesIds.wanted.length > 0 ? { in: dishTypesIds.wanted } : {}),
				notIn: dishTypesIds.notWanted,
			},
			recipes: {
				some: {
					AND: [
						...(seasonalRecipes
							? [
									{
										season: {
											AND: [
												{ start: { lte: dateIntoDayNumber() } },
												{ end: { gte: dateIntoDayNumber() } },
											],
										},
									},
								]
							: []),
						...ingredientsIds.wanted.map((id) => ({
							ingredients: {
								some: {
									ingredientId: id,
								},
							},
						})),
						{
							ingredients: {
								none: {
									ingredientId: {
										in: ingredientsIds.notWanted,
									},
								},
							},
						},
						...ustensilsIds.wanted.map((id) => ({
							ustensils: {
								some: {
									id: id,
								},
							},
						})),
						{
							ustensils: {
								none: {
									id: {
										in: ustensilsIds.notWanted,
									},
								},
							},
						},
						...(allergensIds.length > 0
							? [
									{
										NOT: {
											allergens: {
												some: {
													id: {
														in: QueryToNumber(allergensIds),
													},
												},
											},
										},
									},
								]
							: []),
					],
				},
			},
		},
	});
}
*/
