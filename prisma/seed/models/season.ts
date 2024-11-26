import type { Prisma, PrismaClient, Season } from '@prisma/client';

async function generateSeason(
	id: number,
	name: string,
	start: Date,
	end: Date,
	ingredients: Prisma.IngredientCreateNestedManyWithoutCreatedByInput,
	createdById: number,
	prismaClient: PrismaClient,
): Promise<Season> {
	return await prismaClient.season.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			start: start,
			end: end,
			ingredients: ingredients,
			createdById: createdById,
		},
	});
}

export async function seed_season(prismaClient: PrismaClient): Promise<void> {
	await generateSeason(
		1,
		'Printemps',
		new Date('2022-01-01T00:00:00.000Z'),
		new Date('2022-04-01T00:00:00.000Z'),
		{},
		1,
		prismaClient,
	);
	await generateSeason(
		2,
		'Ete',
		new Date('2022-04-01T00:00:00.000Z'),
		new Date('2022-07-01T00:00:00.000Z'),
		{},
		1,
		prismaClient,
	);
	await generateSeason(
		3,
		'Automne',
		new Date('2022-07-01T00:00:00.000Z'),
		new Date('2022-10-01T00:00:00.000Z'),
		{},
		1,
		prismaClient,
	);
	await generateSeason(
		4,
		'Hiver',
		new Date('2022-10-01T00:00:00.000Z'),
		new Date('2022-12-01T00:00:00.000Z'),
		{},
		1,
		prismaClient,
	);
}
