import type { MealType, PrismaClient } from '@prisma/client';

async function generateMealType(id: number, name: string, createdById: number, prismaClient: PrismaClient): Promise<MealType> {
	return await prismaClient.mealType.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			createdById: createdById,
		},
	});
}

export async function seed_mealType(prismaClient: PrismaClient): Promise<void> {
	await generateMealType(1, 'Petit-déjeuner', 1, prismaClient);
	await generateMealType(2, 'Déjeuner', 1, prismaClient);
	await generateMealType(3, 'Goûter', 1, prismaClient);
	await generateMealType(4, 'Apéro', 1, prismaClient);
	await generateMealType(5, 'Dîner', 1, prismaClient);
}
