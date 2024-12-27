import type { H3Event, EventHandlerRequest } from 'h3';
import type { FilterSelectItem, Recipes } from '~/global/types';
import prisma from '~/lib/prisma';

export async function getRecipes() {
	const recipes = await prisma.recipe.findMany();
	return recipes;
}

export async function getRecipesWithLessData(
	recipeCategoryId: number,
): Promise<Recipes> {
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
				},
			},
		},
	});
	return recipes ?? { recipes: [] };
}

export async function getRecipe(id: number) {
	const recipe = await prisma.recipe.findUnique({
		where: {
			id: id,
		},
	});
	return recipe;
}

export async function getRecipesFiltered(
	_event: H3Event<EventHandlerRequest>,
): Promise<Recipes[]> {
	const query = getQuery(_event);

	const ingredientsIds: FilterSelectItem = JSON.parse(
		query.ingredients as string,
	);
	const ustensilsIds: FilterSelectItem = JSON.parse(query.ustensils as string);
	const seasonalRecipes: boolean = query.seasonalRecipes === 'true';
	const allergensIds: number[] = (query.allergens as number[]) ?? [];
	const recipeCategoryId: number = Number(query.recipeCategoryId);

	// If all the filters lists are empty, return all the recipes without any filter
	if (
		areAllEmpty(ingredientsIds, ustensilsIds) &&
		allergensIds?.length === 0 &&
		!seasonalRecipes
	) {
		return [
			{
				...(await getRecipesWithLessData(recipeCategoryId)),
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
