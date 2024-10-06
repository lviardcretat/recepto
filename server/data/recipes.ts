import prisma from '~/lib/prisma';

export async function getRecipes() {
	const recipes = await prisma.recipe.findMany();
	return recipes;
}

export async function getRecipe(id: number) {
	const recipe = await prisma.recipe.findUnique({
		where: {
			id: id,
		},
	});
	return recipe;
}
