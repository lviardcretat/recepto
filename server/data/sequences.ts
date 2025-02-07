import prisma from '~/lib/prisma';

export async function getSequences() {
	const sequences = await prisma.sequence.findMany();
	return sequences;
}

export async function postSequence(
	title: string,
	description: string,
	recipeId: number,
	createdById: number,
) {
	const sequence = await prisma.sequence.create({
		data: {
			title: title,
			description: description,
			recipeId: recipeId,
			createdById: createdById,
		},
	});
	return sequence;
}

export async function getSequence(id: number) {
	const sequence = await prisma.sequence.findUnique({
		where: {
			id: id,
		},
	});
	return sequence;
}
