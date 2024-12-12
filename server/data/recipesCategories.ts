import type { H3Event, EventHandlerRequest } from 'h3';
import prisma from '~/lib/prisma';
import type { FilterSelectItem } from '~/stores/filters';

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
	const query = getQuery(_event);

	const ingredientsIds: FilterSelectItem = JSON.parse(
		query.ingredients as string,
	);
	const ustensilsIds: FilterSelectItem = JSON.parse(query.ustensils as string);
	const mealTypesIds: FilterSelectItem = JSON.parse(query.mealTypes as string);
	const dishTypesIds: FilterSelectItem = JSON.parse(query.dishTypes as string);
	const seasonalRecipes: boolean = query.seasonalRecipes === 'true';
	const allergensIds: number[] = (query.allergens as number[]) ?? [];

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

interface RecipesCategories {
	id: number;
	name: string;
	createdById: number | null;
	createdAt: Date;
	updatedAt: Date | null;
}
