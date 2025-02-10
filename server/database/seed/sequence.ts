import type { SequenceInsert } from '~/server/utils/drizzle';

export const sequencesSeed: SequenceInsert[] = [
	{
		id: 1,
		title: 'Préparez-vous',
		description:
			"Ne vous lavez pas les mains et enlevez votre t-shirt pour avoir l'air plus viril",
		recipeId: 1,
		createdById: 1,
	},
	{
		id: 2,
		title: 'Préparez la pâte',
		description:
			'Tu vas juste aller à Lidl et en acheter une tout prête car tu sais pertinament que tu auras la flemme de la faire',
		recipeId: 1,
		createdById: 1,
	},
	{
		id: 3,
		title: 'Fracassez la patee',
		description:
			'Fracassez la patee avec un énorme marteau et pétez lui la gueule avec un fouet',
		recipeId: 1,
		createdById: 1,
	},
	{
		id: 4,
		title: 'Faites semblant de bosser',
		description: 'Versez généreusement le sucre dans un saladier et improvisez',
		recipeId: 1,
		createdById: 1,
	},
	{
		id: 5,
		title: 'Dressez la patee',
		description:
			"Dites à vos invités que vous allez commander tacos ce soir et que s'il sont pas content, qu'ils aillent bien se faire *****",
		recipeId: 1,
		createdById: 1,
	},
];
