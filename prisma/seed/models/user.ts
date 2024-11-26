import type { Prisma, PrismaClient, User } from '@prisma/client';

async function generateUser(
	id: number,
	email: string,
	password: string,
	firstname: string,
	lastname: string,
	picture: string,
	recipeCreatedNumber: number,
	recipes: Prisma.RecipeCreateNestedManyWithoutCreatedByInput,
	role: string,
	season: Prisma.SeasonCreateNestedManyWithoutCreatedByInput,
	sequence: Prisma.SequenceCreateNestedManyWithoutCreatedByInput,
	ustensil: Prisma.UstensilCreateNestedManyWithoutCreatedByInput,
	ingredient: Prisma.IngredientCreateNestedManyWithoutCreatedByInput,
	foodType: Prisma.FoodTypeCreateNestedManyWithoutCreatedByInput,
	unit: Prisma.UnitCreateNestedManyWithoutCreatedByInput,
	recipesCategory: Prisma.RecipesCategoryCreateNestedManyWithoutCreatedByInput,
	prismaClient: PrismaClient,
): Promise<User> {
	return await prismaClient.user.upsert({
		where: { id: id },
		update: {},
		create: {
			email: email,
			password: password,
			firstname: firstname,
			lastname: lastname,
			picture: picture,
			recipeCreatedNumber: recipeCreatedNumber,
			recipes: recipes,
			role: role,
			season: season,
			sequence: sequence,
			ustensil: ustensil,
			ingredient: ingredient,
			foodType: foodType,
			unit: unit,
			recipesCategory: recipesCategory,
		},
	});
}

export async function seed_user(prismaClient: PrismaClient): Promise<void> {
	await generateUser(
		1,
		'test@test.com',
		'1234',
		'jean',
		'claude',
		'photo',
		10,
		{},
		'default',
		{},
		{},
		{},
		{},
		{},
		{},
		{},
		prismaClient,
	);
}
