import type { FoodType, PrismaClient } from '@prisma/client';

async function generateAllergen(id: number, name: string, icon: string, createdById: number, prismaClient: PrismaClient): Promise<FoodType> {
	return await prismaClient.allergen.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			icon: icon,
			createdById: createdById,
		},
	});
}

export async function seed_allergen(prismaClient: PrismaClient): Promise<void> {
	await generateAllergen(1, 'Gluten', 'gluten_icon', 1, prismaClient);
	await generateAllergen(2, 'Crustacés', 'crustace_icon', 1, prismaClient);
	await generateAllergen(3, 'Oeufs', 'oeuf_icon', 1, prismaClient);
	await generateAllergen(4, 'Poissons', 'poisson_icon', 1, prismaClient);
	await generateAllergen(5, 'Arachides', 'arachide_icon', 1, prismaClient);
	await generateAllergen(6, 'Soja', 'soja_icon', 1, prismaClient);
	await generateAllergen(7, 'Lait', 'lait_icon', 1, prismaClient);
	await generateAllergen(8, 'Fruits à coque', 'fruits_coque_icon', 1, prismaClient);
	await generateAllergen(9, 'Céleri', 'celeri_icon', 1, prismaClient);
	await generateAllergen(10, 'Moutarde', 'moutarde_icon', 1, prismaClient);
	await generateAllergen(11, 'Graines de sésame', 'graines_sesame_icon', 1, prismaClient);
	await generateAllergen(12, 'Lupin', 'lupin_icon', 1, prismaClient);
	await generateAllergen(13, 'Mollusques', 'mollusques_icon', 1, prismaClient);
	await generateAllergen(14, 'Anhydride sulfureux, sulfites', 'anhydride_sulfureux', 1, prismaClient);
}
