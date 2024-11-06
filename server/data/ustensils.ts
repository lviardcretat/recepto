import prisma from '~/lib/prisma';

export async function getUstensils() {
	const ustensils = await prisma.ustensil.findMany();
	return ustensils;
}

export async function getUstensil(id: number) {
	const ustensil = await prisma.ustensil.findUnique({
		where: {
			id: id,
		},
	});
	return ustensil;
}
