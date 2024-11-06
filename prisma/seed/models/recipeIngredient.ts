import type { PrismaClient } from '@prisma/client';

export async function seed_recipeIngredient(prismaClient: PrismaClient) {
	await generateRecipeIngredient(1, 1, 1, 1, 1, prismaClient);
	await generateRecipeIngredient(2, 2, 1, 1, 1, prismaClient);
}

async function generateRecipeIngredient(
	id: number,
	ingredientId: number,
	quantity: number,
	recipeId: number,
	unitId: number,
	prismaClient: PrismaClient,
) {
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
