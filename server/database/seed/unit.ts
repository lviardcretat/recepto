import type { UnitInsert } from '~~/server/utils/drizzleUtils';

export const unitsSeed: UnitInsert[] = [
  {
    id: 1,
    name: 'Kilogramme',
    shortForm: 'kg',
    createdById: 4,
  },
  {
    id: 2,
    name: 'Gramme',
    shortForm: 'g',
    createdById: 4,
  },
  {
    id: 3,
    name: 'Litre',
    shortForm: 'L',
    createdById: 4,
  },
  {
    id: 4,
    name: 'Millilitre',
    shortForm: 'ml',
    createdById: 4,
  },
  {
    id: 5,
    name: 'Cuillère à soupe',
    shortForm: 'c.s.',
    createdById: 4,
  },
  {
    id: 6,
    name: 'Cuillère à café',
    shortForm: 'c.c.',
    createdById: 4,
  },
  {
    id: 7,
    name: 'Once',
    shortForm: 'oz',
    createdById: 4,
  },
  {
    id: 8,
    name: 'Tasse',
    shortForm: 'cup',
    createdById: 4,
  },
  {
    id: 9,
    name: 'Gallon',
    shortForm: 'gal',
    createdById: 4,
  },
];
