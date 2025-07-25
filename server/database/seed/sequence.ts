import type { SequenceInsert } from '~~/server/utils/drizzleUtils';

export const sequencesSeed: SequenceInsert[] = [
  {
    id: 1,
    name: 'Préparez-vous',
    extra: 'Ne vous lavez pas les mains et enlevez votre t-shirt pour avoir l\'air plus viril',
    recipeId: 1,
    createdById: 4,
  },
  {
    id: 2,
    name: 'Préparez la pâte',
    extra: 'Tu vas juste aller à Lidl et en acheter une tout prête car tu sais pertinament que tu auras la flemme de la faire',
    recipeId: 1,
    createdById: 4,
  },
  {
    id: 3,
    name: 'Fracassez la patee',
    extra: 'Fracassez la patee avec un énorme marteau et pétez lui la gueule avec un fouet',
    recipeId: 1,
    createdById: 4,
  },
  {
    id: 4,
    name: 'Faites semblant de bosser',
    extra: 'Versez généreusement le sucre dans un saladier et improvisez',
    recipeId: 1,
    createdById: 4,
  },
  {
    id: 5,
    name: 'Dressez la patee',
    extra: 'Dites à vos invités que vous allez commander tacos ce soir et que s\'il sont pas content, qu\'ils aillent bien se faire *****',
    recipeId: 1,
    createdById: 4,
  },
];
