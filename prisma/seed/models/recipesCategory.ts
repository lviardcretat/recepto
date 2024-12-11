import type { Prisma, PrismaClient, RecipesCategory } from '@prisma/client';

async function generateRecipesCategory(id: number, name: string, mealTypesIds: number[], dishTypeId: number, createdById: number, prismaClient: PrismaClient): Promise<RecipesCategory> {
	const mealTypes: Array<Prisma.MealTypeWhereUniqueInput> = Array.from(mealTypesIds, (mealType) => ({ id: mealType }));
	return await prismaClient.recipesCategory.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			mealTypes: {
				connect: mealTypes,
			},
			dishTypeId: dishTypeId,
			createdById: createdById,
		},
	});
}

export async function seed_recipesCategory(prismaClient: PrismaClient): Promise<void> {
	await generateRecipesCategory(1, 'Lasagnes', [2, 5], 3, 1, prismaClient);
	await generateRecipesCategory(2, 'Gâteau au chocolat', [2, 3, 5], 5, 1, prismaClient);
	await generateRecipesCategory(3, 'Gâteau aux poires', [2, 3, 5], 5, 1, prismaClient);
	await generateRecipesCategory(4, 'Gâteau aux pommes', [2, 3, 5], 5, 1, prismaClient);
	await generateRecipesCategory(5, 'Tartiflette', [2, 3, 5], 5, 1, prismaClient);
}
