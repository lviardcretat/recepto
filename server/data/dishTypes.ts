import prisma from '~/lib/prisma';

export async function getDishTypes() {
	const dishTypes = await prisma.dishType.findMany();
	return dishTypes;
}

export async function getDishType(id: number) {
	const dishType = await prisma.dishType.findUnique({
		where: {
			id: id,
		},
	});
	return dishType;
}
