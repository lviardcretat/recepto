import type { PrismaClient, Season } from '@prisma/client';

async function generateSeason(id: number, name: string, start: number, end: number, createdById: number, prismaClient: PrismaClient): Promise<Season> {
	return await prismaClient.season.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			start: start,
			end: end,
			createdById: createdById,
		},
	});
}

export async function seed_season(prismaClient: PrismaClient): Promise<void> {
	await generateSeason(1, 'Printemps', 1, 92, 1, prismaClient);
	await generateSeason(2, 'Ete', 93, 183, 1, prismaClient);
	await generateSeason(3, 'Automne', 184, 275, 1, prismaClient);
	await generateSeason(4, 'Hiver', 276, 366, 1, prismaClient);
}
