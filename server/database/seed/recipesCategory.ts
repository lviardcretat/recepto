import type { RecipesCategoryInsert } from '~~/server/utils/drizzleUtils';

export const recipesCategorySeed: RecipesCategoryInsert[] = [
	{
		id: 1,
		name: 'Lasagnes',
		dishTypeId: 3,
		createdById: 1,
	},
	{
		id: 2,
		name: 'Gâteau au chocolat',
		dishTypeId: 5,
		createdById: 1,
	},
	{
		id: 3,
		name: 'Gâteau aux pommes',
		dishTypeId: 5,
		createdById: 1,
	},
];
