import type { PrismaClient, RecipeIngredient } from '@prisma/client';

async function generateRecipeIngredient(
	id: number,
	ingredientId: number,
	quantity: number,
	recipeId: number,
	unitId: number,
	prismaClient: PrismaClient,
): Promise<RecipeIngredient> {
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

export async function seed_recipeIngredient(
	prismaClient: PrismaClient,
): Promise<void> {
	await generateRecipeIngredient(1, 1, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(2, 2, 1, 1, 1, prismaClient);
}
