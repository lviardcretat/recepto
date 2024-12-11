import type { DishType, PrismaClient } from '@prisma/client';

async function generateDishType(id: number, name: string, createdById: number, prismaClient: PrismaClient): Promise<DishType> {
	return await prismaClient.dishType.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			createdById: createdById,
		},
	});
}

export async function seed_dishType(prismaClient: PrismaClient): Promise<void> {
	await generateDishType(1, 'Apéritif', 1, prismaClient);
	await generateDishType(2, 'Entrée', 1, prismaClient);
	await generateDishType(3, 'Plat de résistance', 1, prismaClient);
	await generateDishType(4, 'Fromage', 1, prismaClient);
	await generateDishType(5, 'Dessert', 1, prismaClient);
	await generateDishType(6, 'Digestif', 1, prismaClient);
}
