import type { Prisma, PrismaClient, Recipe } from '@prisma/client';

async function generateRecipe(id: number, name: string, peopleNumber: number, cookingTime: Date, preparationTime: Date, restTime: Date, description: string, tips: string, ustensilsIds: number[], recipesCategory: number, createdById: number, prismaClient: PrismaClient): Promise<Recipe> {
	const ustensils: Array<Prisma.UstensilWhereUniqueInput> = Array.from(ustensilsIds, (ustensil) => ({ id: ustensil }));
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
			recipesCategoryId: recipesCategory,
			createdById: createdById,
		},
	});
}

export async function seed_recipe(prismaClient: PrismaClient): Promise<void> {
	await generateRecipe(1, 'Lasagnes', 4, new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), '', '', [5, 11, 9, 12, 1, 2, 3], 1, 1, prismaClient);
	await generateRecipe(2, 'Lasagnes végétariennes', 4, new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), '', '', [5, 14, 11, 12, 1, 2, 3, 4, 13, 9], 1, 1, prismaClient);
	await generateRecipe(3, 'Gâteau au chocolat', 4, new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), '', '', [3, 5, 7, 8, 10, 11], 2, 1, prismaClient);
	await generateRecipe(4, 'Gâteau au chocolat sans gluten', 4, new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), '', '', [3, 5, 7, 8, 10, 11], 2, 1, prismaClient);
	await generateRecipe(5, 'Gâteau aux pommes', 4, new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), '', '', [3, 5, 7, 8, 10, 11], 4, 1, prismaClient);
	await generateRecipe(6, 'Gâteau aux poires', 4, new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), new Date('2022-12-02T00:00:00.000Z'), '', '', [3, 5, 7, 8, 10, 11], 3, 1, prismaClient);
}
