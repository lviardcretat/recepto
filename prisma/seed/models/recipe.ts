import type { Prisma, PrismaClient } from '@prisma/client';

export async function seed_recipe(prismaClient: PrismaClient) {
	await generateRecipe(
		1,
		'Lasagnes',
		4,
		new Date('2022-12-02T00:00:00.000Z'),
		new Date('2022-12-02T00:00:00.000Z'),
		new Date('2022-12-02T00:00:00.000Z'),
		'',
		'',
		{},
		{},
		{},
		{},
		1,
		prismaClient,
	);
}

async function generateRecipe(
	id: number,
	name: string,
	peopleNumber: number,
	cookingTime: Date,
	preparationTime: Date,
	restTime: Date,
	description: string,
	tips: string,
	utensils: Prisma.UstensilUncheckedCreateNestedManyWithoutRecipesInput,
	sequences: Prisma.SequenceUncheckedCreateNestedManyWithoutRecipeInput,
	ingredients: Prisma.RecipeIngredientUncheckedCreateNestedManyWithoutRecipeInput,
	recipesCategory: Prisma.RecipesCategoryCreateNestedOneWithoutRecipesInput,
	createdById: number,
	prismaClient: PrismaClient,
) {
	return await prismaClient.recipe.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			peopleNumber: peopleNumber,
			cookingTime: cookingTime,
			preparationTime: preparationTime,
			restTime: restTime,
			description: description,
			tips: tips,
			utensils: utensils,
			sequences: sequences,
			ingredients: ingredients,
			recipesCategory: recipesCategory,
			// TODO : Add createdById, why this is undefined ???
			createdById: undefined,
		},
	});
}
