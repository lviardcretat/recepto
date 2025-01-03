import type { FoodType, PrismaClient } from '@prisma/client';

async function generateFoodType(id: number, name: string, createdById: number, prismaClient: PrismaClient): Promise<FoodType> {
	return await prismaClient.foodType.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			createdById: createdById,
		},
	});
}

export async function seed_foodType(prismaClient: PrismaClient): Promise<void> {
	await generateFoodType(1, 'Fruits et légumes', 1, prismaClient);
	await generateFoodType(2, 'Féculents', 1, prismaClient);
	await generateFoodType(3, 'Viandes, poissons, fruits de mer et oeufs', 1, prismaClient);
	await generateFoodType(4, 'Produits laitiers', 1, prismaClient);
	await generateFoodType(5, 'Matières grasses ', 1, prismaClient);
	await generateFoodType(6, 'Produits sucrés ', 1, prismaClient);
	await generateFoodType(7, 'Boissons ', 1, prismaClient);
}
