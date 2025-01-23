import type { PrismaClient, Sequence } from '@prisma/client';

async function generateSequence(id: number, recipeId: number, title: string, description: string, createdById: number, prismaClient: PrismaClient): Promise<Sequence> {
	return await prismaClient.sequence.upsert({
		where: { id: id },
		update: {},
		create: {
			title: title,
			description: description,
			recipeId: recipeId,
			createdById: createdById,
		},
	});
}

export async function seed_sequence(prismaClient: PrismaClient): Promise<void> {
	await generateSequence(1, 1, 'Préparez-vous', "Ne vous lavez pas les mains et enlevez votre t-shirt pour avoir l'air plus viril", 1, prismaClient);
	await generateSequence(2, 1, 'Préparez la pâte', 'Tu vas juste aller à Lidl et en acheter une tout prête car tu sais pertinament que tu auras la flemme de la faire', 1, prismaClient);
	await generateSequence(3, 1, 'Fracassez la pâte', 'Fracassez la pâte avec un énorme marteau et pétez lui la gueule avec un fouet', 1, prismaClient);
	await generateSequence(4, 1, 'Faites semblant de bosser', 'Versez généreusement le sucre dans un saladier et improvisez', 1, prismaClient);
	await generateSequence(5, 1, 'Dressez la pâte', "Dites à vos invités que vous allez commander tacos ce soir et que s'il sont pas content, qu'ils aillent bien se faire *****", 1, prismaClient);
}
