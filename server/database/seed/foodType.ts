import type { FoodTypeInsert } from '~/server/utils/drizzle';

export const foodTypesSeed: FoodTypeInsert[] = [
	{
		id: 1,
		name: 'Fruits et légumes',
		createdById: 1,
	},
	{
		id: 2,
		name: 'Féculents',
		createdById: 1,
	},
	{
		id: 3,
		name: 'Viandes, poissons, fruits de mer et oeufs',
		createdById: 1,
	},
	{
		id: 4,
		name: 'Produits laitiers',
		createdById: 1,
	},
	{
		id: 5,
		name: 'Matières grasses ',
		createdById: 1,
	},
	{
		id: 6,
		name: 'Produits sucrés ',
		createdById: 1,
	},
	{
		id: 7,
		name: 'Boissons ',
		createdById: 1,
	},
];
