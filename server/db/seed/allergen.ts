import type { AllergenInsert } from '~~/server/utils/drizzleUtils';

export const allergensSeed: AllergenInsert[] = [
  {
    id: 1,
    name: 'Gluten',
    icon: 'gluten',
    createdById: 1,
  },
  {
    id: 2,
    name: 'Crustacés',
    icon: 'crab',
    createdById: 1,
  },
  {
    id: 3,
    name: 'Oeufs',
    icon: 'eggs',
    createdById: 1,
  },
  {
    id: 4,
    name: 'Poissons',
    icon: 'fish',
    createdById: 1,
  },
  {
    id: 5,
    name: 'Arachides',
    icon: 'cashew',
    createdById: 1,
  },
  {
    id: 6,
    name: 'Soja',
    icon: 'soya',
    createdById: 1,
  },
  {
    id: 7,
    name: 'Lait',
    icon: 'milk',
    createdById: 1,
  },
  {
    id: 8,
    name: 'Fruits à coque',
    icon: 'walnut',
    createdById: 1,
  },
  {
    id: 9,
    name: 'Céleri',
    icon: 'celery',
    createdById: 1,
  },
  {
    id: 10,
    name: 'Moutarde',
    icon: 'mustard',
    createdById: 1,
  },
  {
    id: 11,
    name: 'Graines de sésame',
    icon: 'sesame',
    createdById: 1,
  },
  {
    id: 12,
    name: 'Lupin',
    icon: 'lupine',
    createdById: 1,
  },
  {
    id: 13,
    name: 'Mollusques',
    icon: 'abalone',
    createdById: 1,
  },
  {
    id: 14,
    name: 'Anhydride sulfureux, sulfites',
    icon: 'sulfur-sulphites',
    createdById: 1,
  },
];
