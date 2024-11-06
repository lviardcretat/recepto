import type { Prisma, PrismaClient } from '@prisma/client';

export async function seed_recipesCategory(prismaClient: PrismaClient) {
	await generateRecipesCategory(1, 'Lasagnes', {}, 1, prismaClient);
	await generateRecipesCategory(2, 'Gâteau au chocolat', {}, 1, prismaClient);
	await generateRecipesCategory(3, 'Tiramisu', {}, 1, prismaClient);
	await generateRecipesCategory(4, 'Tartiflette', {}, 1, prismaClient);
}

async function generateRecipesCategory(
	id: number,
	name: string,
	recipes: Prisma.RecipeUncheckedCreateNestedManyWithoutRecipesCategoryInput,
	createdById: number,
	prismaClient: PrismaClient,
) {
	return await prismaClient.recipesCategory.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			recipes: recipes,
			createdById: createdById,
		},
	});
}
