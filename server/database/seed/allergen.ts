import type { AllergenInsert } from '~~/server/utils/drizzleUtils';

export const allergensSeed: AllergenInsert[] = [
  {
    id: 1,
    name: 'Gluten',
    icon: 'gluten',
    createdById: 4,
  },
  {
    id: 2,
    name: 'Crustacés',
    icon: 'crab',
    createdById: 4,
  },
  {
    id: 3,
    name: 'Oeufs',
    icon: 'eggs',
    createdById: 4,
  },
  {
    id: 4,
    name: 'Poissons',
    icon: 'fish',
    createdById: 4,
  },
  {
    id: 5,
    name: 'Arachides',
    icon: 'cashew',
    createdById: 4,
  },
  {
    id: 6,
    name: 'Soja',
    icon: 'soya',
    createdById: 4,
  },
  {
    id: 7,
    name: 'Lait',
    icon: 'milk',
    createdById: 4,
  },
  {
    id: 8,
    name: 'Fruits à coque',
    icon: 'walnut',
    createdById: 4,
  },
  {
    id: 9,
    name: 'Céleri',
    icon: 'celery',
    createdById: 4,
  },
  {
    id: 10,
    name: 'Moutarde',
    icon: 'mustard',
    createdById: 4,
  },
  {
    id: 11,
    name: 'Graines de sésame',
    icon: 'sesame',
    createdById: 4,
  },
  {
    id: 12,
    name: 'Lupin',
    icon: 'lupine',
    createdById: 4,
  },
  {
    id: 13,
    name: 'Mollusques',
    icon: 'abalone',
    createdById: 4,
  },
  {
    id: 14,
    name: 'Anhydride sulfureux, sulfites',
    icon: 'sulfur-sulphites',
    createdById: 4,
  },
];
