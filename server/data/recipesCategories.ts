import type { RecipesCategories } from '~/global/types';
import type {
	FilterSelectItem,
	RecipesCategoriesFilter,
} from '~/global/validationSchemas';
import prisma from '~/lib/prisma';

export async function postRecipesCategory(
	name: string,
	dishTypeId: number,
	createdById: number,
) {
	const recipesCategory = await prisma.recipesCategory.create({
		data: {
			name: name,
			dishTypeId: dishTypeId,
			createdById: createdById,
		},
	});
	return recipesCategory;
}

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

export async function getRecipesCategoriesAndRecipesNames(name: string) {
	const recipesCategories = await prisma.recipesCategory.findMany({
		where: {
			OR: [
				{
					name: { contains: name },
				},
				{
					recipes: {
						some: {
							name: { contains: name },
						},
					},
				},
			],
		},
		orderBy: {
			name: 'asc',
		},
		select: {
			name: true,
			id: true,
			recipes: {
				where: {
					name: { contains: name },
				},
				orderBy: {
					name: 'asc',
				},
				select: {
					name: true,
					id: true,
				},
			},
		},
	});
	return recipesCategories;
}

export async function getRecipesCategoryName(id: number) {
	const recipesCategoryName = await prisma.recipesCategory.findUnique({
		where: {
			id: id,
		},
		select: {
			name: true,
		},
	});
	return recipesCategoryName;
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
