import prisma from '~/lib/prisma';

export async function getUnits() {
	const units = await prisma.unit.findMany();
	return units;
}

export async function getUnit(id: number) {
	const unit = await prisma.unit.findUnique({
		where: {
			id: id,
		},
	});
	return unit;
}
