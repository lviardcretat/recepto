import prisma from '~/lib/prisma';

export async function getIngredients() {
	const ingredients = await prisma.ingredient.findMany();
	return ingredients;
}

export async function getIngredient(id: number) {
	const ingredient = await prisma.ingredient.findUnique({
		where: {
			id: id,
		},
	});
	return ingredient;
}
