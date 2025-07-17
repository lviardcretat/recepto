import type { RecipesFilter } from '~/schemas/filter';
import type {
  AllergenToRecipe,
  Recipe,
  RecipeInsert,
  RecipeToUstensil,
} from '../utils/drizzleUtils';
import {
  areAllEmpty,
  createAllergenSubQuery,
  createIngredientSubQuery,
  createSeasonalRecipeSubQuery,
  createUstensilSubQuery,
  recipeSelectType,
} from '../utils/filterUtils';
import { intersect } from 'drizzle-orm/sqlite-core';
import type {
  RecipeWithLessData,
  RecipesCategoriesWithLessData,
} from '~/types/filter';
import type { RecipeDetail } from '~/types/recipeCard';
import type { RecipesDashboard } from '~/types/recipesDashboard';

export async function postRecipe(
  name: string,
  description: string,
  tips: string | undefined,
  peopleNumber: number,
  preparationTime: number,
  cookingTime: number,
  restTime: number,
  seasonId: number,
  recipesCategoryId: number,
  allergensIds: number[] | undefined,
  ustensilIds: number[],
  createdById: number,
): Promise<number> {
  const recipeInsert: RecipeInsert = {
    name: name,
    description: description,
    tips: tips,
    peopleNumber: peopleNumber,
    preparationTime: preparationTime,
    cookingTime: cookingTime,
    restTime: restTime,
    seasonId: seasonId,
    recipesCategoryId: recipesCategoryId,
    createdById: createdById,
  };
  const recipe = await useDrizzle()
    .insert(tables.recipe)
    .values(recipeInsert)
    .returning()
    .get();

  for (const ustensilId of ustensilIds) {
    const recipeToUstensil: RecipeToUstensil = {
      recipeId: recipe.id,
      ustensilId: ustensilId,
    };
    await useDrizzle()
      .insert(tables.recipeToUstensil)
      .values(recipeToUstensil);
  }
  if (allergensIds) {
    for (const allergensId of allergensIds) {
      const allergenToRecipe: AllergenToRecipe = {
        recipeId: recipe.id,
        allergenId: allergensId,
      };
      await useDrizzle()
        .insert(tables.allergenToRecipe)
        .values(allergenToRecipe);
    }
  }
  return recipe.id;
}

export async function getRecipes(): Promise<Recipe[]> {
  const recipes: Recipe[] = await useDrizzle()
    .select()
    .from(tables.recipe)
    .all();
  return recipes;
}

export async function getRecipesWithRecipesCategoriesDashboard(userId: number): Promise<RecipesDashboard[]> {
  const recipes: RecipesDashboard[] = await useDrizzle().query.recipe.findMany({
    columns: {
      name: true,
      recipesCategoryId: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      recipesCategory: {
        columns: {
          id: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    where: (recipes, { eq }) => eq(recipes.createdById, userId),
  });
  return recipes;
}

export async function getRecipe(id: number): Promise<RecipeDetail | undefined> {
  const recipe: RecipeDetail | undefined = await useDrizzle().query.recipe.findFirst({
    columns: {
      id: true,
      name: true,
      peopleNumber: true,
      cookingTime: true,
      preparationTime: true,
      restTime: true,
      description: true,
      tips: true,
      seasonId: true,
      createdAt: true,
      recipesCategoryId: false,
      updatedAt: false,
      createdById: false,
    },
    with: {
      allergens: {
        orderBy: allergen => allergen.allergenId,
        columns: {
          allergenId: false,
          recipeId: false,
        },
        with: {
          allergen: {
            columns: {
              name: true,
              icon: true,
            },
          },
        },
      },
      ingredients: {
        orderBy: ingredient => ingredient.ingredientId,
        columns: { quantity: true },
        with: {
          ingredient: { columns: { name: true } },
          unit: { columns: { shortForm: true } },
        },
      },
      sequences: {
        orderBy: sequence => sequence.id,
        columns: {
          id: true,
          name: true,
          extra: true,
        },
      },
      ustensils: {
        orderBy: ustensil => ustensil.ustensilId,
        columns: {
          recipeId: false,
          ustensilId: false,
        },
        with: {
          ustensil: {
            columns: {
              name: true,
            },
          },
        },
      },
      createdBy: {
        columns: {
          username: true,
        },
      },
    },
    where: (recipe, { eq }) => eq(recipe.id, id),
  });
  return recipe;
}

export async function getRecipesWithoutFilter(
  recipeCategoryId: number,
): Promise<RecipeWithLessData[]> {
  const recipes = await useDrizzle()
    .select({ ...recipeSelectType, ...{ createdBy: tables.user.username } })
    .from(tables.recipe)
    .leftJoin(
      tables.recipesCategory,
      eq(tables.recipesCategory.id, tables.recipe.recipesCategoryId),
    )
    .leftJoin(tables.user, eq(tables.user.id, tables.recipe.createdById))
    .where(eq(tables.recipesCategory.id, recipeCategoryId))
    .all();
  return recipes;
}

export async function getRecipesFiltered(
  query: RecipesFilter,
): Promise<RecipeWithLessData[]> {
  const ingredientsIds = query.ingredients;
  const ustensilsIds = query.ustensils;
  const seasonalRecipes = query.seasonalRecipes === true;
  const allergensIds = query.allergens;
  const recipeCategoryId = query.recipeCategoryId;

  if (
    !(
      ingredientsIds.wanted
      && ingredientsIds.notWanted
      && ustensilsIds.wanted
      && ustensilsIds.notWanted
      && allergensIds
      && recipeCategoryId
    )
  ) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Specific recipe query filter unvalid',
    });
  }

  if (
    areAllEmpty(ingredientsIds, ustensilsIds)
    && allergensIds?.length === 0
    && !seasonalRecipes
  ) {
    // If all the filters lists are empty, return all the recipes without any filter
    return getRecipesWithoutFilter(recipeCategoryId);
  }

  let recipes = [];
  const subQueries = [
    await createIngredientSubQuery(ingredientsIds, recipeCategoryId),
    await createUstensilSubQuery(ustensilsIds, recipeCategoryId),
    await createAllergenSubQuery(allergensIds, recipeCategoryId),
    await createSeasonalRecipeSubQuery(seasonalRecipes, recipeCategoryId),
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: any[] = [];

  for (const subQuery of subQueries) {
    if (subQuery) filters.push(subQuery);
  }

  // conditions due to the limitations of the intersect function, which requires specifically two parameters
  if (filters.length > 2) {
    recipes = (await intersect(
      filters[0],
      filters[1],
      ...filters.slice(2),
    ).all()) as unknown as RecipesCategoriesWithLessData[];
  }
  else if (filters.length === 2) {
    recipes = (await intersect(
      filters[0],
      filters[1],
    ).all()) as unknown as RecipesCategoriesWithLessData[];
  }
  else if (filters.length === 1) {
    recipes = await filters[0]
    // Dynamic query building to instantiate several where in a single query
      .$dynamic()
      .groupBy(tables.recipe.id)
      .all();
  }
  return recipes;
}
