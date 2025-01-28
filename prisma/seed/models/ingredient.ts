import type { Ingredient, PrismaClient } from '@prisma/client';

let id = 0;

async function generateIngredient(name: string, foodTypeId: number, icon: string, createdById: number, seasonalMonths: number[][], prismaClient: PrismaClient): Promise<Ingredient> {
	const ingredient = await prismaClient.ingredient.upsert({
		where: { id: id },
		update: {},
		create: {
			name: name,
			foodTypeId: foodTypeId,
			seasonalMonths: seasonalMonths,
			icon: icon,
			createdById: createdById,
		},
	});
	id += 1;
	return ingredient;
}

export async function seed_ingredient(prismaClient: PrismaClient): Promise<void> {
	await generateIngredient('Ail', 1, 'Ail_icon', 1, [[0, 12]], prismaClient);
	await generateIngredient('Artichaut', 1, 'Artichaut_icon', 1, [[3, 9]], prismaClient);
	await generateIngredient('Asperge', 1, 'Asperge_icon', 1, [[2, 7]], prismaClient);
	await generateIngredient('Aubergine', 1, 'Aubergine_icon', 1, [[4, 10]], prismaClient);
	await generateIngredient('Betterave', 1, 'Betterave_icon', 1, [[0, 12]], prismaClient);
	await generateIngredient('Blette', 1, 'Blette_icon', 1, [[2, 10]], prismaClient);
	await generateIngredient('Brocoli', 1, 'Brocoli_icon', 1, [[5, 11]], prismaClient);
	await generateIngredient('Carotte', 1, 'Carotte_icon', 1, [[1, 12]], prismaClient);
	await generateIngredient(
		'Céleri-branche',
		1,
		'Céleri-branche_icon',
		1,
		[
			[6, 12],
			[0, 1],
		],
		prismaClient,
	);
	await generateIngredient(
		'Céleri-rave',
		1,
		'Céleri-rave_icon',
		1,
		[
			[9, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient(
		'Chou',
		1,
		'Chou_icon',
		1,
		[
			[8, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient(
		'Chou blanc',
		1,
		'Chou blanc_icon',
		1,
		[
			[7, 12],
			[0, 2],
		],
		prismaClient,
	);
	await generateIngredient(
		'Chou de Bruxelles',
		1,
		'Chou de Bruxelles_icon',
		1,
		[
			[8, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient(
		'Chou-fleur',
		1,
		'Chou-fleur_icon',
		1,
		[
			[8, 11],
			[2, 5],
		],
		prismaClient,
	);
	await generateIngredient(
		'Chou frisé',
		1,
		'Chou frisé_icon',
		1,
		[
			[8, 12],
			[0, 2],
		],
		prismaClient,
	);
	await generateIngredient(
		'Chou rouge',
		1,
		'Chou rouge_icon',
		1,
		[
			[7, 12],
			[0, 2],
		],
		prismaClient,
	);
	await generateIngredient('Chou romanesco', 1, 'Chou romanesco_icon', 1, [[5, 9]], prismaClient);
	await generateIngredient('Citrouille', 1, 'Citrouille_icon', 1, [[10, 11]], prismaClient);
	await generateIngredient('Concombre', 1, 'Concombre_icon', 1, [[3, 10]], prismaClient);
	await generateIngredient(
		'Courge',
		1,
		'Courge_icon',
		1,
		[
			[7, 12],
			[0, 1],
		],
		prismaClient,
	);
	await generateIngredient('Courgette', 1, 'Courgette_icon', 1, [[4, 10]], prismaClient);
	await generateIngredient(
		'Crosne',
		1,
		'Crosne_icon',
		1,
		[
			[10, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient(
		'Endive',
		1,
		'Endive_icon',
		1,
		[
			[9, 12],
			[0, 4],
		],
		prismaClient,
	);
	await generateIngredient('Epinard', 1, 'Epinard_icon', 1, [[0, 12]], prismaClient);
	await generateIngredient('Fenouil', 1, 'Fenouil_icon', 1, [[5, 11]], prismaClient);
	await generateIngredient(
		'Frisée',
		1,
		'Frisée_icon',
		1,
		[
			[7, 12],
			[0, 4],
		],
		prismaClient,
	);
	await generateIngredient('Haricot vert', 1, 'Haricot vert_icon', 1, [[5, 10]], prismaClient);
	await generateIngredient('Laitue', 1, 'Laitue_icon', 1, [[3, 10]], prismaClient);
	await generateIngredient(
		'Mâche',
		1,
		'Mâche_icon',
		1,
		[
			[10, 12],
			[0, 2],
		],
		prismaClient,
	);
	await generateIngredient(
		'Navet',
		1,
		'Navet_icon',
		1,
		[
			[9, 12],
			[0, 6],
		],
		prismaClient,
	);
	await generateIngredient('Oignon', 1, 'Oignon_icon', 1, [[0, 12]], prismaClient);
	await generateIngredient(
		'Panais',
		1,
		'Panais_icon',
		1,
		[
			[8, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient('Patate douce', 1, 'Patate douce_icon', 1, [[8, 10]], prismaClient);
	await generateIngredient('Petit pois', 1, 'Petit pois_icon', 1, [[3, 7]], prismaClient);
	await generateIngredient(
		'Poireau',
		1,
		'Poireau_icon',
		1,
		[
			[8, 12],
			[0, 4],
		],
		prismaClient,
	);
	await generateIngredient('Poivron', 1, 'Poivron_icon', 1, [[5, 9]], prismaClient);
	await generateIngredient(
		'Pomme de terre de conservation',
		1,
		'Pomme de terre de conservation_icon',
		1,
		[
			[8, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient('Pomme de terre primeur', 1, 'Pomme de terre primeur_icon', 1, [[3, 8]], prismaClient);
	await generateIngredient('Potiron', 1, 'Potiron_icon', 1, [[8, 12]], prismaClient);
	await generateIngredient('Radis', 1, 'Radis_icon', 1, [[1, 12]], prismaClient);
	await generateIngredient('Rutabaga', 1, 'Rutabaga_icon', 1, [[9, 12]], prismaClient);
	await generateIngredient(
		'Salsifi',
		1,
		'Salsifi_icon',
		1,
		[
			[9, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient(
		'Topinambour',
		1,
		'Topinambour_icon',
		1,
		[
			[9, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient('Amande fraiche', 1, 'Amande fraiche_icon', 1, [[6, 8]], prismaClient);
	await generateIngredient('Amande sèche', 1, 'Amande sèche_icon', 1, [[0, 12]], prismaClient);
	await generateIngredient('Abricot', 1, 'Abricot_icon', 1, [[5, 8]], prismaClient);
	await generateIngredient('Baie de goji', 1, 'Baie de goji_icon', 1, [[7, 10]], prismaClient);
	await generateIngredient('Brugnon', 1, 'Brugnon_icon', 1, [[5, 8]], prismaClient);
	await generateIngredient('Cassis', 1, 'Cassis_icon', 1, [[5, 8]], prismaClient);
	await generateIngredient('Cerise', 1, 'Cerise_icon', 1, [[4, 7]], prismaClient);
	await generateIngredient('Châtaigne', 1, 'Châtaigne_icon', 1, [[9, 12]], prismaClient);
	await generateIngredient(
		'Citron',
		1,
		'Citron_icon',
		1,
		[
			[0, 4],
			[5, 6],
			[9, 12],
		],
		prismaClient,
	);
	await generateIngredient(
		'Clémentine',
		1,
		'Clémentine_icon',
		1,
		[
			[0, 2],
			[10, 12],
		],
		prismaClient,
	);
	await generateIngredient('Coing', 1, 'Coing_icon', 1, [[8, 11]], prismaClient);
	await generateIngredient('Figue', 1, 'Figue_icon', 1, [[6, 10]], prismaClient);
	await generateIngredient('Fraise', 1, 'Fraise_icon', 1, [[4, 8]], prismaClient);
	await generateIngredient('Framboise', 1, 'Framboise_icon', 1, [[5, 10]], prismaClient);
	await generateIngredient('Groseille', 1, 'Groseille_icon', 1, [[5, 8]], prismaClient);
	await generateIngredient(
		'Kiwi',
		1,
		'Kiwi_icon',
		1,
		[
			[10, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient(
		'Mandarine',
		1,
		'Mandarine_icon',
		1,
		[
			[0, 2],
			[10, 12],
		],
		prismaClient,
	);
	await generateIngredient('Melon', 1, 'Melon_icon', 1, [[5, 9]], prismaClient);
	await generateIngredient('Mirabelle', 1, 'Mirabelle_icon', 1, [[7, 9]], prismaClient);
	await generateIngredient('Mûre', 1, 'Mûre_icon', 1, [[7, 9]], prismaClient);
	await generateIngredient('Myrtille', 1, 'Myrtille_icon', 1, [[6, 10]], prismaClient);
	await generateIngredient('Nectarine', 1, 'Nectarine_icon', 1, [[6, 8]], prismaClient);
	await generateIngredient('Noisette', 1, 'Noisette_icon', 1, [[7, 10]], prismaClient);
	await generateIngredient('Noix', 1, 'Noix_icon', 1, [[8, 10]], prismaClient);
	await generateIngredient(
		'Orange',
		1,
		'Orange_icon',
		1,
		[
			[10, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient('Pamplemousse', 1, 'Pamplemousse_icon', 1, [[0, 6]], prismaClient);
	await generateIngredient('Pastèque', 1, 'Pastèque_icon', 1, [[5, 9]], prismaClient);
	await generateIngredient('Pêche', 1, 'Pêche_icon', 1, [[5, 9]], prismaClient);
	await generateIngredient(
		'Poire',
		1,
		'Poire_icon',
		1,
		[
			[6, 12],
			[0, 4],
		],
		prismaClient,
	);
	await generateIngredient(
		'Pomme',
		1,
		'Pomme_icon',
		1,
		[
			[0, 4],
			[5, 6],
			[7, 12],
		],
		prismaClient,
	);
	await generateIngredient('Prune', 1, 'Prune_icon', 1, [[5, 9]], prismaClient);
	await generateIngredient('Pruneau', 1, 'Pruneau_icon', 1, [[7, 9]], prismaClient);
	await generateIngredient('Raisin', 1, 'Raisin_icon', 1, [[7, 10]], prismaClient);
	await generateIngredient('Rhubarbe', 1, 'Rhubarbe_icon', 1, [[4, 7]], prismaClient);
	await generateIngredient('Tomate', 1, 'Tomate_icon', 1, [[4, 10]], prismaClient);
	await generateIngredient('Quinoa', 1, 'Quinoa_icon', 1, [[7, 10]], prismaClient);
	await generateIngredient('Soja', 1, 'Soja_icon', 1, [[9, 10]], prismaClient);
	await generateIngredient('Tournesol', 1, 'Tournesol_icon', 1, [[8, 9]], prismaClient);

	await generateIngredient(
		"Avoine d'hiver",
		2,
		"Avoine d'hiver_icon",
		1,
		[
			[5, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient(
		'Avoine de printemps',
		2,
		'Avoine de printemps_icon',
		1,
		[
			[5, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient(
		"Blé dur d'hiver et de printemps",
		2,
		"Blé dur d'hiver et de printemps_icon",
		1,
		[
			[6, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient(
		"Blé tendre d'hiver et de printemp",
		2,
		"Blé tendre d'hiver et de printemp_icon",
		1,
		[
			[6, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient(
		'Féveroles et fèves',
		2,
		'Féveroles et fèves_icon',
		1,
		[
			[6, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient('Haricot blanc', 2, 'Haricot blanc_icon', 1, [[6, 10]], prismaClient);
	await generateIngredient(
		'Lentille',
		2,
		'Lentille_icon',
		1,
		[
			[10, 12],
			[0, 3],
		],
		prismaClient,
	);
	await generateIngredient('Maïs', 2, 'Maïs_icon', 1, [[6, 11]], prismaClient);
	await generateIngredient(
		"Orge d'hiver",
		2,
		"Orge d'hiver_icon",
		1,
		[
			[5, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient(
		'Orge de printemps',
		2,
		'Orge de printemps_icon',
		1,
		[
			[6, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient(
		'Pois',
		2,
		'Pois_icon',
		1,
		[
			[5, 8],
			[11, 12],
		],
		prismaClient,
	);
	await generateIngredient('Riz', 2, 'Riz_icon', 1, [[8, 10]], prismaClient);
	await generateIngredient('Sarrasin', 2, 'Sarrasin_icon', 1, [[8, 10]], prismaClient);
	await generateIngredient(
		'Seigle',
		2,
		'Seigle_icon',
		1,
		[
			[5, 8],
			[11, 12],
		],
		prismaClient,
	);
}
