import prisma from '~/lib/prisma';

export async function getSeasons() {
	const seasons = await prisma.season.findMany();
	return seasons;
}

export async function getSeason(id: number) {
	const season = await prisma.season.findUnique({
		where: {
			id: id,
		},
	});
	return season;
}
