import prisma from '~/lib/prisma';

export async function getAllergens() {
	const allergens = await prisma.allergen.findMany();
	return allergens;
}

export async function getAllergen(id: number) {
	const allergen = await prisma.allergen.findUnique({
		where: {
			id: id,
		},
	});
	return allergen;
}
