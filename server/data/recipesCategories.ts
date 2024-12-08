import prisma from '~/lib/prisma';
import type { H3Event, EventHandlerRequest } from 'h3';

export async function getRecipesCategories() {
	const recipesCategories = await prisma.recipesCategory.findMany({
		include: {
			_count: {
				select: { recipes: true },
			},
		},
	});
	return recipesCategories;
}

export async function getRecipesCategory(id: number) {
	const recipesCategory = await prisma.recipesCategory.findUnique({
		where: {
			id: id,
		},
		include: {
			recipes: true,
			_count: {
				select: { recipes: true },
			},
		},
	});
	return recipesCategory;
}

export async function getRecipesCategoriesFiltered(
	_event: H3Event<EventHandlerRequest>,
): Promise<RecipesCategories[]> {
	const {
		ustensilsIdWanted,
		ustensilsIdNotWanted,
		ingredientsIdUsed,
		ingredientsIdNotWanted,
	} = getQuery(_event);

	const ustensilsIdsWanted = QueryToNumber(ustensilsIdWanted);
	const ustensilsIdsNotWanted = QueryToNumber(ustensilsIdNotWanted);
	const ingredientsIdsWanted = QueryToNumber(ingredientsIdUsed);
	const ingredientsIdsNotWanted = QueryToNumber(ingredientsIdNotWanted);

	// If all the filters lists are empty, return all the recipes without any filter
	if (
		areAllEmpty(
			ustensilsIdsWanted,
			ustensilsIdsNotWanted,
			ingredientsIdsWanted,
			ingredientsIdsNotWanted,
		)
	) {
		return await getRecipesCategories();
	}

	const filteredRecipesUstensilsWanted: RecipesCategories[] =
		await filterUstensilsWanted(ustensilsIdsWanted);
	const filteredRecipesUstensilsNotWanted: RecipesCategories[] =
		await filterUstensilsNotWanted(ustensilsIdsNotWanted);
	const filteredRecipesIngredientsWanted: RecipesCategories[] =
		await filterIngredientsWanted(ingredientsIdsWanted);
	const filteredRecipesIngredientsNotWanted: RecipesCategories[] =
		await filterIngredientsNotWanted(ingredientsIdsNotWanted);

	return filterRecipesCategoriesMatchingAllFilterCriteria(
		filteredRecipesUstensilsWanted,
		filteredRecipesUstensilsNotWanted,
		filteredRecipesIngredientsWanted,
		filteredRecipesIngredientsNotWanted,
	);
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
 * Checks if all the filters lists are empty or undefined
 *
 * @param filtersListsIds - All the filters lists
 *
 * @returns True if all the filters lists are empty
 */
function areAllEmpty(...filtersListsIds: (number[] | undefined)[]): boolean {
	return filtersListsIds.every(
		(list) => list === undefined || list.length === 0,
	);
}

/**
 * Filters recipesCategories to output only those that match ALL filter criteria
 *
 * @param recipesCategoriesList - All the recipesCategories to filter based on individual criteria
 *
 * @returns All the recipesCategories filtered based on all filter criteria
 */
function filterRecipesCategoriesMatchingAllFilterCriteria(
	...recipesCategoriesList: RecipesCategories[][]
): RecipesCategories[] {
	if (recipesCategoriesList.length === 0) return [];

	const recipesCategoriesListNotEmpty = recipesCategoriesList.filter(
		(recipesCategory) => recipesCategory.length > 0,
	);

	if (recipesCategoriesListNotEmpty.length >= 2) {
		return recipesCategoriesListNotEmpty[0].filter((item) =>
			recipesCategoriesListNotEmpty.every((list) =>
				list.some((listItem) => listItem.id === item.id),
			),
		);
	}

	return recipesCategoriesListNotEmpty[0];
}

/**
 *
 * @param ustensilsIdsWanted - Ustensils ids that the user want in the recipes
 *
 * @returns All the recipesCategories that match the ustensils wanted
 */
async function filterUstensilsWanted(
	ustensilsIdsWanted: number[],
): Promise<RecipesCategories[]> {
	if (ustensilsIdsWanted.length > 0) {
		return await prisma.recipesCategory.findMany({
			where: {
				recipes: {
					some: {
						ustensils: {
							some: {
								id: {
									in: ustensilsIdsWanted,
								},
							},
						},
					},
				},
			},
		});
	}
	return [];
}

/**
 *
 * @param ustensilsIdsNotWanted - Ustensils ids that the user don't want in the recipes
 *
 * @returns All the recipesCategories that don't match the ustensils not wanted
 */
async function filterUstensilsNotWanted(
	ustensilsIdsNotWanted: number[],
): Promise<RecipesCategories[]> {
	if (ustensilsIdsNotWanted.length > 0) {
		return await prisma.recipesCategory.findMany({
			where: {
				NOT: {
					recipes: {
						every: {
							ustensils: {
								some: {
									id: {
										in: ustensilsIdsNotWanted,
									},
								},
							},
						},
					},
				},
			},
		});
	}
	return [];
}

/**
 *
 * @param ingredientsIdsWanted - Ingredients ids that the user want in the recipes
 *
 * @returns All the recipesCategories that match the ingredients wanted
 */
async function filterIngredientsWanted(
	ingredientsIdsWanted: number[],
): Promise<RecipesCategories[]> {
	if (ingredientsIdsWanted.length > 0) {
		return await prisma.recipesCategory.findMany({
			where: {
				recipes: {
					some: {
						ingredients: {
							some: {
								id: {
									in: ingredientsIdsWanted,
								},
							},
						},
					},
				},
			},
		});
	}
	return [];
}

/**
 *
 * @param ustensilsIdsNotWanted - Ingredients ids that the user don't want in the recipes
 *
 * @returns All the recipesCategories that don't match the ingredients not wanted
 */
async function filterIngredientsNotWanted(
	ingredientsIdsNotWanted: number[],
): Promise<RecipesCategories[]> {
	if (ingredientsIdsNotWanted.length > 0) {
		return await prisma.recipesCategory.findMany({
			where: {
				NOT: {
					recipes: {
						every: {
							ingredients: {
								some: {
									id: {
										in: ingredientsIdsNotWanted,
									},
								},
							},
						},
					},
				},
			},
		});
	}
	return [];
}

interface RecipesCategories {
	id: number;
	name: string;
	createdById: number | null;
	createdAt: Date;
	updatedAt: Date | null;
}
