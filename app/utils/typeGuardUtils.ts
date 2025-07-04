import type {
  RecipesCategoriesWithLessData,
  RecipeWithLessData,
} from '~/types/filter';

const TypeGuardUtils = {
/**
 * @param recipe The recipe
 * @returns RecipeWithLessData as a type predicate
 */
  isRecipeWithLessData: (
    recipe: RecipesCategoriesWithLessData | RecipeWithLessData,
  ): recipe is RecipeWithLessData => {
    return (recipe as RecipeWithLessData).restTime !== undefined;
  },

  /**
 * @param recipe The recipe
 * @returns RecipesCategoriesWithLessData as a type predicate
 */
  isRecipesCategoriesWithLessData: (
    recipe: RecipesCategoriesWithLessData | RecipeWithLessData,
  ): recipe is RecipesCategoriesWithLessData => {
    return (recipe as RecipeWithLessData).restTime === undefined;
  },
};

export { TypeGuardUtils };
