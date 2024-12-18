import type { PrismaClient, Unit } from '@prisma/client';

async function generateUnit(id: number, name: string, shortForm: string, createdById: number, prismaClient: PrismaClient): Promise<Unit> {
	return await prismaClient.unit.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			shortForm: shortForm,
			createdById: createdById,
		},
	});
}

export async function seed_unit(prismaClient: PrismaClient): Promise<void> {
	await generateUnit(1, 'Kilogramme', 'kg', 1, prismaClient);
	await generateUnit(2, 'Gramme', 'g', 1, prismaClient);
	await generateUnit(3, 'Litre', 'L', 1, prismaClient);
	await generateUnit(4, 'Millilitre', 'ml', 1, prismaClient);
	await generateUnit(5, 'Cuillère à soupe', 'c.s.', 1, prismaClient);
	await generateUnit(6, 'Cuillère à café', 'c.c.', 1, prismaClient);
	await generateUnit(7, 'Once', 'oz', 1, prismaClient);
	await generateUnit(8, 'Tasse', 'cup', 1, prismaClient);
	await generateUnit(9, 'Gallon', 'gal', 1, prismaClient);
}
