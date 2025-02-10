import type { RecipeInsert } from '~/server/utils/drizzle';

export const recipesSeed: RecipeInsert[] = [
	{
		id: 1,
		name: 'Lasagnes au boeuf',
		peopleNumber: 4,
		preparationTime: 1,
		cookingTime: 2,
		restTime: 1,
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
		tips: 'dqzdzqqzddzq',
		seasonId: 1,
		recipesCategoryId: 1,
		createdById: 1,
	},
	{
		id: 2,
		name: 'Lasagnes végé',
		peopleNumber: 2,
		preparationTime: 1.25,
		cookingTime: 5,
		restTime: 0,
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
		tips: 'dqzdzqqzddzq',
		seasonId: 1,
		recipesCategoryId: 2,
		createdById: 1,
	},
	{
		id: 3,
		name: 'Gâteau au chocolat',
		peopleNumber: 2,
		preparationTime: 1.25,
		cookingTime: 5,
		restTime: 0,
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
		tips: 'dqzdzqqzddzq',
		seasonId: 1,
		recipesCategoryId: 2,
		createdById: 1,
	},
	{
		id: 4,
		name: 'Gâteau au chocolat sans gluten',
		peopleNumber: 2,
		preparationTime: 1.25,
		cookingTime: 5,
		restTime: 0,
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
		tips: 'dqzdzqqzddzq',
		seasonId: 1,
		recipesCategoryId: 2,
		createdById: 1,
	},
	{
		id: 5,
		name: 'Gâteau aux pommes',
		peopleNumber: 2,
		preparationTime: 1.25,
		cookingTime: 5,
		restTime: 0,
		description:
			"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing",
		tips: 'dqzdzqqzddzq',
		seasonId: 1,
		recipesCategoryId: 3,
		createdById: 1,
	},
];
