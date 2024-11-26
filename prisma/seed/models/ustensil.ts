import type { Prisma, PrismaClient, Ustensil } from '@prisma/client';

async function generateUstensil(
	id: number,
	name: string,
	recipes: Prisma.RecipeCreateNestedManyWithoutCreatedByInput,
	createdById: number,
	prismaClient: PrismaClient,
): Promise<Ustensil> {
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

export async function seed_ustensil(prismaClient: PrismaClient): Promise<void> {
	await generateUstensil(1, 'Couteau', {}, 1, prismaClient);
	await generateUstensil(2, 'Cuillère', {}, 1, prismaClient);
	await generateUstensil(3, 'Casserole', {}, 1, prismaClient);
	await generateUstensil(4, 'Mixeur', {}, 1, prismaClient);
}
