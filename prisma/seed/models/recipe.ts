import type { Prisma, PrismaClient, Recipe } from '@prisma/client';

async function generateRecipe(
	id: number,
	name: string,
	peopleNumber: number,
	cookingTime: number,
	preparationTime: number,
	restTime: number,
	description: string,
	tips: string,
	ustensilsIds: number[],
	allergensIds: number[],
	recipesCategory: number,
	createdById: number,
	seasonId: number,
	prismaClient: PrismaClient,
): Promise<Recipe> {
	const ustensils: Array<Prisma.UstensilWhereUniqueInput> = Array.from(ustensilsIds, (ustensil) => ({ id: ustensil }));
	const allergens: Array<Prisma.AllergenWhereUniqueInput> = Array.from(allergensIds, (allergen) => ({ id: allergen }));
	return await prismaClient.recipe.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			peopleNumber: peopleNumber,
			cookingTime: cookingTime,
			preparationTime: preparationTime,
			restTime: restTime,
			description: description,
			tips: tips,
			ustensils: {
				connect: ustensils,
			},
			allergens: {
				connect: allergens,
			},
			recipesCategoryId: recipesCategory,
			seasonId: seasonId,
			createdById: createdById,
		},
	});
}

export async function seed_recipe(prismaClient: PrismaClient): Promise<void> {
	await generateRecipe(
		1,
		'Lasagnes',
		4,
		1,
		2,
		1,
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
		"Avec un peu de farine c'est encore meilleur !",
		[5, 11, 9, 12, 1, 2, 3],
		[7],
		1,
		1,
		1,
		prismaClient,
	);
	await generateRecipe(
		2,
		'Lasagnes végétariennes',
		4,
		0.5,
		0.3,
		4,
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
		'',
		[5, 14, 11, 12, 1, 2, 3, 4, 13, 9],
		[7],
		1,
		1,
		2,
		prismaClient,
	);
	await generateRecipe(3, 'Gâteau au chocolat', 4, 1, 2, 3, '', '', [3, 5, 7, 8, 10, 11], [1, 3], 2, 1, 3, prismaClient);
	await generateRecipe(4, 'Gâteau au chocolat sans gluten', 4, 1, 2, 3, '', '', [3, 5, 7, 8, 10, 11], [1, 3], 2, 1, 4, prismaClient);
	await generateRecipe(5, 'Gâteau aux pommes', 4, 1, 2, 3, '', '', [3, 5, 7, 8, 10, 11], [1, 3], 4, 1, 1, prismaClient);
	await generateRecipe(6, 'Gâteau aux poires', 4, 1, 2, 3, '', '', [3, 5, 7, 8, 10, 11], [1, 3], 3, 1, 4, prismaClient);
}
