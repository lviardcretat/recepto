import type { UnitInsert } from '~/server/utils/drizzleUtils';

export const unitsSeed: UnitInsert[] = [
	{
		id: 1,
		name: 'Kilogramme',
		shortForm: 'kg',
		createdById: 1,
	},
	{
		id: 2,
		name: 'Gramme',
		shortForm: 'g',
		createdById: 1,
	},
	{
		id: 3,
		name: 'Litre',
		shortForm: 'L',
		createdById: 1,
	},
	{
		id: 4,
		name: 'Millilitre',
		shortForm: 'ml',
		createdById: 1,
	},
	{
		id: 5,
		name: 'Cuillère à soupe',
		shortForm: 'c.s.',
		createdById: 1,
	},
	{
		id: 6,
		name: 'Cuillère à café',
		shortForm: 'c.c.',
		createdById: 1,
	},
	{
		id: 7,
		name: 'Once',
		shortForm: 'oz',
		createdById: 1,
	},
	{
		id: 8,
		name: 'Tasse',
		shortForm: 'cup',
		createdById: 1,
	},
	{
		id: 9,
		name: 'Gallon',
		shortForm: 'gal',
		createdById: 1,
	},
];
