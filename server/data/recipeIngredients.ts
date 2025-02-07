import prisma from '~/lib/prisma';

export async function getRecipeIngredients() {
	const recipeIngredients = await prisma.recipeIngredient.findMany();
	return recipeIngredients;
}

export async function postRecipeIngredient(
	ingredientId: number,
	quantity: number,
	unitId: number,
	recipeId: number,
) {
	const recipeIngredient = await prisma.recipeIngredient.create({
		data: {
			ingredientId: ingredientId,
			quantity: quantity,
			unitId: unitId,
			recipeId: recipeId,
		},
	});
	return recipeIngredient;
}

export async function getRecipeIngredient(id: number) {
	const recipeIngredient = await prisma.recipeIngredient.findUnique({
		where: {
			id: id,
		},
	});
	return recipeIngredient;
}
