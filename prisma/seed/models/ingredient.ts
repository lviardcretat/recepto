import type { Ingredient, PrismaClient } from '@prisma/client';

async function generateIngredient(id: number, name: string, foodTypeId: number, icon: string, createdById: number, prismaClient: PrismaClient): Promise<Ingredient> {
	return await prismaClient.ingredient.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			foodTypeId: foodTypeId,
			icon: icon,
			createdById: createdById,
		},
	});
}

export async function seed_ingredient(prismaClient: PrismaClient): Promise<void> {
	await generateIngredient(1, 'Pomme', 1, 'pomme_icon', 1, prismaClient);
	await generateIngredient(2, 'Huile', 5, 'huile_icon', 1, prismaClient);
	await generateIngredient(3, 'Oeuf', 3, 'oeuf_icon', 1, prismaClient);
	await generateIngredient(4, 'Poire', 1, 'poire_icon', 1, prismaClient);
	await generateIngredient(5, 'Blanc de poulet', 3, 'blanc_poulet_icon', 1, prismaClient);
	await generateIngredient(6, 'Cassis', 1, 'cassis_icon', 1, prismaClient);
	await generateIngredient(7, 'Kiwi', 1, 'kiwi_icon', 1, prismaClient);
	await generateIngredient(8, 'Ananas', 1, 'ananas_icon', 1, prismaClient);
	await generateIngredient(9, 'Cerise', 1, 'cerise_icon', 1, prismaClient);
	await generateIngredient(10, 'Tomate', 1, 'tomates_icon', 1, prismaClient);
	await generateIngredient(11, 'Aubergine', 1, 'aubergines_icon', 1, prismaClient);
	await generateIngredient(12, 'Poivron jaune', 1, 'poivron_jaune_icon', 1, prismaClient);
	await generateIngredient(13, 'Poivron rouge', 1, 'poivron_rouge_icon', 1, prismaClient);
	await generateIngredient(14, 'Thym', 1, 'thym_icon', 1, prismaClient);
	await generateIngredient(15, 'Courgette', 1, 'courgette_icon', 1, prismaClient);
	await generateIngredient(16, 'Carotte', 1, 'carotte_icon', 1, prismaClient);
	await generateIngredient(17, 'Oignon', 1, 'oignon_icon', 1, prismaClient);
	await generateIngredient(18, 'Ail', 1, 'ail_icon', 1, prismaClient);
	await generateIngredient(19, 'Boeuf haché', 3, 'boeuf_haché_icon', 1, prismaClient);
	await generateIngredient(20, 'Céleri', 1, 'celeri_icon', 1, prismaClient);
	await generateIngredient(21, 'Beurre', 5, 'beurre_icon', 1, prismaClient);
	await generateIngredient(22, 'Farine', 2, 'farine_icon', 1, prismaClient);
	await generateIngredient(23, 'Chocolat', 6, 'chocolat_icon', 1, prismaClient);
}
