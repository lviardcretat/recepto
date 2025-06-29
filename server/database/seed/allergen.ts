import type { AllergenInsert } from '~~/server/utils/drizzleUtils';

export const allergensSeed: AllergenInsert[] = [
	{
		id: 1,
		name: 'Gluten',
		icon: 'gluten_icon',
		createdById: 1,
	},
	{
		id: 2,
		name: 'Crustacés',
		icon: 'crustace_icon',
		createdById: 1,
	},
	{
		id: 3,
		name: 'Oeufs',
		icon: 'oeuf_icon',
		createdById: 1,
	},
	{
		id: 4,
		name: 'Poissons',
		icon: 'poisson_icon',
		createdById: 1,
	},
	{
		id: 5,
		name: 'Arachides',
		icon: 'arachide_icon',
		createdById: 1,
	},
	{
		id: 6,
		name: 'Soja',
		icon: 'soja_icon',
		createdById: 1,
	},
	{
		id: 7,
		name: 'Lait',
		icon: 'lait_icon',
		createdById: 1,
	},
	{
		id: 8,
		name: 'Fruits à coque',
		icon: 'fruits_coque_icon',
		createdById: 1,
	},
	{
		id: 9,
		name: 'Céleri',
		icon: 'celeri_icon',
		createdById: 1,
	},
	{
		id: 10,
		name: 'Moutarde',
		icon: 'moutarde_icon',
		createdById: 1,
	},
	{
		id: 11,
		name: 'Graines de sésame',
		icon: 'graines_sesame_icon',
		createdById: 1,
	},
	{
		id: 12,
		name: 'Lupin',
		icon: 'lupin_icon',
		createdById: 1,
	},
	{
		id: 13,
		name: 'Mollusques',
		icon: 'mollusques_icon',
		createdById: 1,
	},
	{
		id: 14,
		name: 'Anhydride sulfureux, sulfites',
		icon: 'anhydride_sulfureux',
		createdById: 1,
	},
];
