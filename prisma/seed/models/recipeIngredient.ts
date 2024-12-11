import type { PrismaClient, RecipeIngredient } from '@prisma/client';

async function generateRecipeIngredient(id: number, ingredientId: number, quantity: number, recipeId: number, unitId: number, prismaClient: PrismaClient): Promise<RecipeIngredient> {
	return await prismaClient.recipeIngredient.upsert({
		where: { id: id },
		update: {},
		create: {
			ingredientId: ingredientId,
			quantity: quantity,
			recipeId: recipeId,
			unitId: unitId,
		},
	});
}

export async function seed_recipeIngredient(prismaClient: PrismaClient): Promise<void> {
	await generateRecipeIngredient(1, 19, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(2, 16, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(3, 17, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(4, 18, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(5, 20, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(6, 10, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(7, 14, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(8, 14, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(9, 12, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(10, 11, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(11, 13, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(12, 10, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(13, 15, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(14, 16, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(15, 17, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(16, 18, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(17, 3, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(18, 22, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(19, 21, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(20, 23, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(21, 3, 1, 4, 1, prismaClient);
	await generateRecipeIngredient(22, 22, 1, 4, 1, prismaClient);
	await generateRecipeIngredient(23, 21, 1, 4, 1, prismaClient);
	await generateRecipeIngredient(24, 3, 1, 5, 1, prismaClient);
	await generateRecipeIngredient(25, 22, 1, 5, 1, prismaClient);
	await generateRecipeIngredient(26, 21, 1, 5, 1, prismaClient);
	await generateRecipeIngredient(27, 1, 1, 5, 1, prismaClient);
	await generateRecipeIngredient(28, 3, 1, 6, 1, prismaClient);
	await generateRecipeIngredient(29, 22, 1, 6, 1, prismaClient);
	await generateRecipeIngredient(30, 21, 1, 6, 1, prismaClient);
	await generateRecipeIngredient(31, 4, 1, 6, 1, prismaClient);
}
