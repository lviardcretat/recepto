import prisma from '~/lib/prisma';

export async function getMealTypes() {
	const mealTypes = await prisma.mealType.findMany();
	return mealTypes;
}

export async function getMealType(id: number) {
	const mealType = await prisma.mealType.findUnique({
		where: {
			id: id,
		},
	});
	return mealType;
}
