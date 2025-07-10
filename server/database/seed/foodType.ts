import type { FoodTypeInsert } from '~~/server/utils/drizzleUtils';

export const foodTypesSeed: FoodTypeInsert[] = [
  {
    id: 1,
    name: 'Fruits et légumes',
    createdById: 4,
  },
  {
    id: 2,
    name: 'Féculents',
    createdById: 4,
  },
  {
    id: 3,
    name: 'Viandes, poissons, fruits de mer et oeufs',
    createdById: 4,
  },
  {
    id: 4,
    name: 'Produits laitiers',
    createdById: 4,
  },
  {
    id: 5,
    name: 'Matières grasses ',
    createdById: 4,
  },
  {
    id: 6,
    name: 'Produits sucrés ',
    createdById: 4,
  },
  {
    id: 7,
    name: 'Boissons ',
    createdById: 4,
  },
];
