import type { Prisma } from '@prisma/client';
import type { Recipe, RecipesWithLessData } from '~/global/types';
import type {
	FilterSelectItem,
	RecipesFilter,
} from '~/global/validationSchemas';
import prisma from '~/lib/prisma';

export async function postRecipe(
	name: string,
	description: string,
	tips: string,
	peopleNumber: number,
	preparationTime: number,
	cookingTime: number,
	restTime: number,
	seasonId: number,
	recipesCategoryId: number,
	allergensIds: number[],
	ustensilIds: number[],
	createdById: number,
) {
	const allergens: Array<Prisma.AllergenWhereUniqueInput> = Array.from(
		allergensIds,
		(allergen) => ({ id: allergen }),
	);
	const ustensils: Array<Prisma.UstensilWhereUniqueInput> = Array.from(
		ustensilIds,
		(ustensil) => ({ id: ustensil }),
	);
	const recipe = await prisma.recipe.create({
		data: {
			name: name,
			description: description,
			tips: tips,
			peopleNumber: peopleNumber,
			preparationTime: preparationTime,
			cookingTime: cookingTime,
			restTime: restTime,
			seasonId: seasonId,
			recipesCategoryId: recipesCategoryId,
			allergens: {
				connect: allergens,
			},
			ustensils: {
				connect: ustensils,
			},
			createdById: createdById,
		},
	});
	return recipe;
}

export async function getRecipes() {
	const recipes = await prisma.recipe.findMany();
	return recipes;
}

export async function getRecipe(id: number): Promise<Recipe | null> {
	const recipe = await prisma.recipe.findUnique({
		where: {
			id: id,
		},
		include: {
			ingredients: {
				select: {
					ingredient: {
						select: {
							name: true,
						},
					},
					unit: {
						select: {
							shortForm: true,
						},
					},
					quantity: true,
				},
			},
			allergens: {
				select: {
					id: true,
					name: true,
					icon: true,
				},
			},
			ustensils: {
				select: {
					id: true,
					name: true,
				},
			},
			sequences: {
				select: {
					id: true,
					title: true,
					description: true,
				},
			},
			createdBy: {
				select: {
					firstname: true,
					lastname: true,
				},
			},
		},
	});
	return recipe ?? null;
}

export async function getRecipesWithoutFilter(
	recipeCategoryId: number,
): Promise<RecipesWithLessData> {
	const recipes = await prisma.recipesCategory.findUnique({
		where: {
			id: recipeCategoryId,
		},
		select: {
			recipes: {
				select: {
					id: true,
					name: true,
					description: true,
					cookingTime: true,
					restTime: true,
					preparationTime: true,
					peopleNumber: true,
					seasonId: true,
					createdBy: {
						select: {
							firstname: true,
							lastname: true,
						},
					},
					createdAt: true,
				},
			},
		},
	});
	return recipes ?? { recipes: [] };
}

export async function getRecipesFiltered(
	query: RecipesFilter,
): Promise<RecipesWithLessData[]> {
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

	return await prisma.recipesCategory.findMany({
		where: {
			id: recipeCategoryId,
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
		select: {
			recipes: {
				select: {
					id: true,
					name: true,
					description: true,
					cookingTime: true,
					restTime: true,
					preparationTime: true,
					peopleNumber: true,
					seasonId: true,
					createdAt: true,
					createdBy: {
						select: {
							firstname: true,
							lastname: true,
						},
					},
				},
			},
		},
	});
}

/**
 * Transform a query string to an array of numbers
 *
 * @param query - The query string | string[] | undefined
 *
 * @returns An array of numbers
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function QueryToNumber(query: any): number[] {
	return Array.isArray(query)
		? query.map(Number)
		: query
			? [Number(query)]
			: [];
}

/**
 * Calculate the day of the year from 1 to 366
 *
 * @returns the day based on the today's date
 */
function dateIntoDayNumber(): number {
	const date = new Date();
	return (
		(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
			Date.UTC(date.getFullYear(), 0, 0)) /
		24 /
		60 /
		60 /
		1000
	);
}

/**
 * Checks if all the filters lists are empty or undefined
 *
 * @param filtersListsIds - All the filters lists
 *
 * @returns True if all the filters lists are empty
 */
function areAllEmpty(...filtersListsIds: FilterSelectItem[]): boolean {
	return filtersListsIds.every(
		(list) =>
			(list.wanted === undefined || list.wanted.length === 0) &&
			(list.notWanted === undefined || list.notWanted.length === 0),
	);
}
