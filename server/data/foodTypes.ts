import prisma from '~/lib/prisma';

export async function getFoodTypes() {
	const foodType = await prisma.foodType.findMany();
	return foodType;
}

export async function getSpecificsFoodTypes(ids: number[]) {
	const foodTypes = await prisma.foodType.findMany({
		where: {
			id: { in: ids },
		},
	});
	return foodTypes;
}

export async function getFoodType(id: number) {
	const foodType = await prisma.foodType.findUnique({
		where: {
			id: id,
		},
	});
	return foodType;
}
