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
	await generateRecipeIngredient(8, 3, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(9, 22, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(10, 21, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(11, 23, 1, 2, 1, prismaClient);
	await generateRecipeIngredient(12, 3, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(13, 22, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(14, 21, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(15, 23, 1, 3, 1, prismaClient);
	await generateRecipeIngredient(16, 3, 1, 4, 1, prismaClient);
	await generateRecipeIngredient(17, 22, 1, 4, 1, prismaClient);
	await generateRecipeIngredient(18, 21, 1, 4, 1, prismaClient);
	await generateRecipeIngredient(19, 1, 1, 4, 1, prismaClient);
	await generateRecipeIngredient(20, 3, 1, 5, 1, prismaClient);
	await generateRecipeIngredient(21, 22, 1, 5, 1, prismaClient);
	await generateRecipeIngredient(22, 21, 1, 5, 1, prismaClient);
	await generateRecipeIngredient(23, 4, 1, 5, 1, prismaClient);
}
