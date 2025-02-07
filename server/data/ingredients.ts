import prisma from '~/lib/prisma';

export async function getIngredients() {
	const ingredients = await prisma.ingredient.findMany();
	return ingredients;
}

export async function postIngredient(
	name: string,
	foodTypeId: number,
	seasonalMonths: number[][],
	createdById: number,
) {
	const ingredient = await prisma.ingredient.create({
		data: {
			name: name,
			foodTypeId: foodTypeId,
			seasonalMonths: seasonalMonths,
			createdById: createdById,
		},
	});
	return ingredient;
}

export async function getIngredientsSeasonalMonths(foodTypeId: number) {
	const ingredients = await prisma.ingredient.findMany({
		where: {
			foodTypeId: foodTypeId,
		},
		select: {
			name: true,
			seasonalMonths: true,
			foodType: {
				select: {
					name: true,
				},
			},
		},
	});
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
