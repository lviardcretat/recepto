import type { PrismaClient, Ustensil } from '@prisma/client';

async function generateUstensil(id: number, name: string, createdById: number, prismaClient: PrismaClient): Promise<Ustensil> {
	return await prismaClient.ustensil.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			createdById: createdById,
		},
	});
}

export async function seed_ustensil(prismaClient: PrismaClient): Promise<void> {
	await generateUstensil(1, 'Couteau', 1, prismaClient);
	await generateUstensil(2, 'Cuillère', 1, prismaClient);
	await generateUstensil(3, 'Casserole', 1, prismaClient);
	await generateUstensil(4, 'Mixeur', 1, prismaClient);
	await generateUstensil(5, 'Four', 1, prismaClient);
	await generateUstensil(6, 'Plat à tarte', 1, prismaClient);
	await generateUstensil(7, 'Moule à manqué', 1, prismaClient);
	await generateUstensil(8, 'Maryse', 1, prismaClient);
	await generateUstensil(9, 'Balance', 1, prismaClient);
	await generateUstensil(10, 'Fouet', 1, prismaClient);
	await generateUstensil(11, 'Saladier', 1, prismaClient);
	await generateUstensil(12, 'Plat à gratin', 1, prismaClient);
	await generateUstensil(13, 'Râpe', 1, prismaClient);
	await generateUstensil(14, 'Econome', 1, prismaClient);
}
