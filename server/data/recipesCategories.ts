import type { RecipesCategoriesFilter } from '~/schemas/filter';
import type {
  RecipesCategory,
  RecipesCategoryInsert,
} from '../utils/drizzleUtils';
import { intersect } from 'drizzle-orm/sqlite-core';
import {
  createAllergenSubQuery,
  createIngredientSubQuery,
  createSeasonalRecipeSubQuery,
  createSubQueryConditions,
  createUstensilSubQuery,
  recipeCategorySelectType,
} from '../utils/filterUtils';
import { count } from 'drizzle-orm';
import type {
  ItemsIdsWantedOrNot,
  RecipesCategoriesWithLessData,
} from '~/types/filter';
import type { RecipeSearched } from '~/types/search';

export async function postRecipesCategory(
  name: string,
  dishTypeId: number,
  createdById: number,
): Promise<void> {
  const recipesCategoryInsert: RecipesCategoryInsert = {
    name: name,
    dishTypeId: dishTypeId,
    createdById: createdById,
  };
  await useDrizzle()
    .insert(tables.recipesCategory)
    .values(recipesCategoryInsert);
}

export async function getRecipesCategories(): Promise<RecipesCategory[]> {
  const recipesCategories: RecipesCategory[] = await useDrizzle()
    .select()
    .from(tables.recipesCategory)
    .all();
  return recipesCategories;
}

export async function getRecipesCategoriesWithRecipeCount(): Promise<RecipesCategoriesWithLessData[]> {
  const recipesCategories: RecipesCategoriesWithLessData[] = await useDrizzle()
    .select({
      id: tables.recipesCategory.id,
      name: tables.recipesCategory.name,
      count: count(tables.recipe.id),
    })
    .from(tables.recipesCategory)
    .innerJoin(
      tables.recipe,
      eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
    )
    .groupBy(tables.recipesCategory.id)
    .all();
  return recipesCategories;
}

export async function getRecipesCategoriesAndRecipesNames(): Promise<RecipeSearched[]> {
  const recipesCategoriesRecipes: RecipeSearched[] = await useDrizzle().query.recipesCategory.findMany({
    columns: {
      id: true,
      name: true,
    },
    with: {
      recipes: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
  return recipesCategoriesRecipes;
}

export async function getRecipesCategoryName(
  id: number,
): Promise<{ name: string } | undefined> {
  const recipesCategory: { name: string } | undefined = await useDrizzle()
    .select({
      name: tables.recipesCategory.name,
    })
    .from(tables.recipesCategory)
    .where(eq(tables.ingredient.id, id))
    .get();
  return recipesCategory;
}

export async function getRecipesCategory(
  id: number,
): Promise<RecipesCategory | undefined> {
  const recipesCategory: RecipesCategory | undefined = await useDrizzle()
    .select()
    .from(tables.recipesCategory)
    .where(eq(tables.ingredient.id, id))
    .get();
  return recipesCategory;
}

export async function getRecipesCategoriesFiltered(
  query: RecipesCategoriesFilter,
): Promise<RecipesCategoriesWithLessData[]> {
  const ingredientsIds: ItemsIdsWantedOrNot = query.ingredients;
  const ustensilsIds: ItemsIdsWantedOrNot = query.ustensils;
  const mealTypesIds: ItemsIdsWantedOrNot = query.mealTypes ?? {
    wanted: [],
    notWanted: [],
  };
  const dishTypesIds: ItemsIdsWantedOrNot = query.dishTypes ?? {
    wanted: [],
    notWanted: [],
  };
  const seasonalRecipes: boolean = query.seasonalRecipes === true;
  const allergensIds: number[] = query.allergens;

  // If all the filters lists are empty, return all the recipes without any filter
  if (
    areAllEmpty(ingredientsIds, ustensilsIds, mealTypesIds, dishTypesIds)
    && allergensIds?.length === 0
    && !seasonalRecipes
  ) {
    return await getRecipesCategoriesWithRecipeCount();
  }

  let recipesCategories: RecipesCategoriesWithLessData[] = [];
  const subQueries = [
    createMealTypeSubQuery(mealTypesIds),
    createDishTypeSubQuery(dishTypesIds),
    createIngredientSubQuery(ingredientsIds),
    createUstensilSubQuery(ustensilsIds),
    createAllergenSubQuery(allergensIds),
    createSeasonalRecipeSubQuery(seasonalRecipes),
  ];
  const filters = [];

  for (const subQuery of subQueries) {
    if (subQuery) filters.push(subQuery);
  }

  // conditions due to the limitations of the intersect function, which requires specifically two parameters
  if (filters.length > 2) {
    recipesCategories = (await intersect(
      filters[0],
      filters[1],
      ...filters.slice(2),
    ).all()) as unknown as RecipesCategoriesWithLessData[];
  }
  else if (filters.length === 2) {
    recipesCategories = (await intersect(
      filters[0],
      filters[1],
    ).all()) as unknown as RecipesCategoriesWithLessData[];
  }
  else if (filters.length === 1) {
    recipesCategories = await filters[0]
    // Dynamic query building to instantiate several where in a single query
      .$dynamic()
      .groupBy(tables.recipesCategory.id)
      .all();
  }
  return recipesCategories;
}

function createMealTypeSubQuery(mealTypesIds: ItemsIdsWantedOrNot) {
  const conditions = createSubQueryConditions(
    mealTypesIds,
    tables.mealTypeToRecipeCategory.mealTypeId,
  );
  if (!conditions) return null;
  return useDrizzle()
    .select(recipeCategorySelectType)
    .from(tables.recipesCategory)
    .innerJoin(
      tables.mealTypeToRecipeCategory,
      eq(
        tables.mealTypeToRecipeCategory.recipeCategoryId,
        tables.recipesCategory.id,
      ),
    )
    .innerJoin(
      tables.recipe,
      eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
    )
    .innerJoin(
      tables.mealType,
      eq(tables.mealType.id, tables.mealTypeToRecipeCategory.mealTypeId),
    )
    .where(and(...conditions))
    .groupBy(tables.recipesCategory.id, tables.mealType.id)
    .having(
      mealTypesIds.wanted.length > 0
        ? sql`count(distinct ${tables.mealTypeToRecipeCategory.mealTypeId}) > ${mealTypesIds.wanted.length - 1}`
        : undefined,
    );
}

function createDishTypeSubQuery(dishTypesIds: ItemsIdsWantedOrNot) {
  const conditions = createSubQueryConditions(dishTypesIds, tables.dishType.id);
  if (!conditions) return null;
  return useDrizzle()
    .select(recipeCategorySelectType)
    .from(tables.recipesCategory)
    .innerJoin(
      tables.recipe,
      eq(tables.recipe.recipesCategoryId, tables.recipesCategory.id),
    )
    .innerJoin(
      tables.dishType,
      eq(tables.dishType.id, tables.recipesCategory.dishTypeId),
    )
    .where(and(...conditions))
    .groupBy(tables.recipesCategory.id);
}
