import prisma from '~/lib/prisma';

export async function getFoodTypes() {
	const foodType = await prisma.foodType.findMany();
	return foodType;
}

export async function getFoodType(id: number) {
	const foodType = await prisma.foodType.findUnique({
		where: {
			id: id,
		},
	});
	return foodType;
}
