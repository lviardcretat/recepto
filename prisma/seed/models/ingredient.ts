import type { Prisma, PrismaClient } from '@prisma/client';

export async function seed_ingredient(prismaClient: PrismaClient) {
	await generateIngredient(1, 'Pomme', 1, 1, 'pomme_icon', {}, 1, prismaClient);
	await generateIngredient(
		2,
		'Huile',
		5,
		2,
		'banane_icon',
		{},
		1,
		prismaClient,
	);
	await generateIngredient(3, 'oeufs', 3, 3, 'poire_icon', {}, 1, prismaClient);
	await generateIngredient(
		4,
		'Fraise',
		1,
		4,
		'fraise_icon',
		{},
		1,
		prismaClient,
	);
	await generateIngredient(
		5,
		'Blanc de poulet',
		3,
		1,
		'cerise_icon',
		{},
		1,
		prismaClient,
	);
	await generateIngredient(
		6,
		'Cassis',
		1,
		1,
		'cassis_icon',
		{},
		1,
		prismaClient,
	);
	await generateIngredient(7, 'Kiwi', 1, 2, 'kiwi_icon', {}, 1, prismaClient);
	await generateIngredient(
		8,
		'Ananas',
		1,
		2,
		'ananas_icon',
		{},
		1,
		prismaClient,
	);
	await generateIngredient(
		9,
		'Cerise',
		1,
		3,
		'cerise_icon',
		{},
		1,
		prismaClient,
	);
	await generateIngredient(
		10,
		'Cassis',
		1,
		4,
		'cassis_icon',
		{},
		1,
		prismaClient,
	);
	await generateIngredient(11, 'Kiwi', 1, 1, 'kiwi_icon', {}, 1, prismaClient);
}

async function generateIngredient(
	id: number,
	name: string,
	foodTypeId: number,
	seasonId: number,
	icon: string,
	recipes: Prisma.RecipeIngredientUncheckedCreateNestedManyWithoutIngredientInput,
	createdById: number,
	prismaClient: PrismaClient,
) {
	return await prismaClient.ingredient.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			foodTypeId: foodTypeId,
			seasonId: seasonId,
			icon: icon,
			recipes: recipes,
			createdById: createdById,
		},
	});
}
