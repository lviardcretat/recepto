import type { IRecipeWithLessData } from '~/types/recipe/detail';
import type { IRecipesCategoriesWithLessData } from '~/types/recipesCategory/detail';

const TypeGuardUtils = {
/**
 * @param recipe The recipe
 * @returns IRecipeWithLessData as a type predicate
 */
  isIRecipeWithLessData: (
    recipe: IRecipesCategoriesWithLessData | IRecipeWithLessData,
  ): recipe is IRecipeWithLessData => {
    return (recipe as IRecipeWithLessData).restTime !== undefined;
  },

  /**
 * @param recipe The recipe
 * @returns IRecipesCategoriesWithLessData as a type predicate
 */
  isIRecipesCategoriesWithLessData: (
    recipe: IRecipesCategoriesWithLessData | IRecipeWithLessData,
  ): recipe is IRecipesCategoriesWithLessData => {
    return (recipe as IRecipeWithLessData).restTime === undefined;
  },
};

export { TypeGuardUtils };
