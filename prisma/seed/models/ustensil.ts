import type { Prisma, PrismaClient } from '@prisma/client';

export async function seed_ustensil(prismaClient: PrismaClient) {
	await generateUstensil(1, 'Couteau', {}, 1, prismaClient);
	await generateUstensil(2, 'Cuillère', {}, 1, prismaClient);
	await generateUstensil(3, 'Casserole', {}, 1, prismaClient);
	await generateUstensil(4, 'Mixeur', {}, 1, prismaClient);
}

async function generateUstensil(
	id: number,
	name: string,
	recipes: Prisma.RecipeCreateNestedManyWithoutCreatedByInput,
	createdById: number,
	prismaClient: PrismaClient,
) {
	return await prismaClient.ustensil.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			recipes: recipes,
			createdById: createdById,
		},
	});
}
