import type { PrismaClient, RecipesCategory } from '@prisma/client';

async function generateRecipesCategory(id: number, name: string, createdById: number, prismaClient: PrismaClient): Promise<RecipesCategory> {
	return await prismaClient.recipesCategory.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			createdById: createdById,
		},
	});
}

export async function seed_recipesCategory(prismaClient: PrismaClient): Promise<void> {
	await generateRecipesCategory(1, 'Lasagnes', 1, prismaClient);
	await generateRecipesCategory(2, 'Gâteau au chocolat', 1, prismaClient);
	await generateRecipesCategory(3, 'Gâteau aux poires', 1, prismaClient);
	await generateRecipesCategory(4, 'Gâteau aux pommes', 1, prismaClient);
	await generateRecipesCategory(5, 'Tartiflette', 1, prismaClient);
}
