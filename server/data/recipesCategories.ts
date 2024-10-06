import prisma from '~/lib/prisma';

export async function getRecipesCategories() {
	const recipesCategories = await prisma.recipeCategory.findMany();
	return recipesCategories;
}

export async function getRecipesCategory(id: number) {
	const recipesCategory = await prisma.recipeCategory.findUnique({
		where: {
			id: id,
		},
	});
	return recipesCategory;
}
