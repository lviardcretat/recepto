import type { SeasonInsert } from '~~/server/utils/drizzleUtils';

export const seasonsSeed: SeasonInsert[] = [
  {
    id: 1,
    name: 'Printemps',
    start: 1,
    end: 92,
    createdById: 1,
  },
  {
    id: 2,
    name: 'Ete',
    start: 93,
    end: 183,
    createdById: 1,
  },
  {
    id: 3,
    name: 'Automne',
    start: 184,
    end: 275,
    createdById: 1,
  },
  {
    id: 4,
    name: 'Hiver',
    start: 276,
    end: 366,
    createdById: 1,
  },
];
