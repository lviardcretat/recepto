import prisma from '~/lib/prisma';

export async function getRecipesCategories() {
	const recipesCategories = await prisma.recipesCategory.findMany({
		include: {
			recipes: true,
			_count: {
				select: { recipes: true },
			},
		},
	});
	return recipesCategories;
}

export async function getRecipesCategory(id: number) {
	const recipesCategory = await prisma.recipesCategory.findUnique({
		where: {
			id: id,
		},
		include: {
			recipes: true,
			_count: {
				select: { recipes: true },
			},
		},
	});
	return recipesCategory;
}
