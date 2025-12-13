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
): Promise<RecipesCategory> {
  const recipesCategoryInsert: RecipesCategoryInsert = {
    name: name,
    dishTypeId: dishTypeId,
    createdById: createdById,
  };
  const recipeCategoryCreated: RecipesCategory = await db
    .insert(schema.recipesCategory)
    .values(recipesCategoryInsert)
    .returning()
    .get();
  return recipeCategoryCreated;
}

export async function getRecipesCategories(): Promise<RecipesCategory[]> {
  const recipesCategories: RecipesCategory[] = await db
    .select()
    .from(schema.recipesCategory)
    .orderBy(schema.recipesCategory.name)
    .all();
  return recipesCategories;
}

export async function getRecipesCategoriesWithRecipeCount(): Promise<RecipesCategoriesWithLessData[]> {
  const recipesCategories: RecipesCategoriesWithLessData[] = await db
    .select({
      id: schema.recipesCategory.id,
      name: schema.recipesCategory.name,
      count: count(schema.recipe.id),
    })
    .from(schema.recipesCategory)
    .innerJoin(
      schema.recipe,
      eq(schema.recipe.recipesCategoryId, schema.recipesCategory.id),
    )
    .groupBy(schema.recipesCategory.id)
    .all();
  return recipesCategories;
}

export async function getRecipesCategoriesAndRecipesNames(): Promise<RecipeSearched[]> {
  const recipesCategoriesRecipes: RecipeSearched[] = await db.query.recipesCategory.findMany({
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
  const recipesCategory: { name: string } | undefined = await db
    .select({
      name: schema.recipesCategory.name,
    })
    .from(schema.recipesCategory)
    .where(eq(schema.ingredient.id, id))
    .get();
  return recipesCategory;
}

export async function getRecipesCategory(
  id: number,
): Promise<RecipesCategory | undefined> {
  const recipesCategory: RecipesCategory | undefined = await db
    .select()
    .from(schema.recipesCategory)
    .where(eq(schema.ingredient.id, id))
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
      .groupBy(schema.recipesCategory.id)
      .all();
  }
  return recipesCategories;
}

function createMealTypeSubQuery(mealTypesIds: ItemsIdsWantedOrNot) {
  const conditions = createSubQueryConditions(
    mealTypesIds,
    schema.mealTypeToRecipeCategory.mealTypeId,
  );
  if (!conditions) return null;
  return db
    .select(recipeCategorySelectType)
    .from(schema.recipesCategory)
    .innerJoin(
      schema.mealTypeToRecipeCategory,
      eq(
        schema.mealTypeToRecipeCategory.recipeCategoryId,
        schema.recipesCategory.id,
      ),
    )
    .innerJoin(
      schema.recipe,
      eq(schema.recipe.recipesCategoryId, schema.recipesCategory.id),
    )
    .innerJoin(
      schema.mealType,
      eq(schema.mealType.id, schema.mealTypeToRecipeCategory.mealTypeId),
    )
    .where(and(...conditions))
    .groupBy(schema.recipesCategory.id, schema.mealType.id)
    .having(
      mealTypesIds.wanted.length > 0
        ? sql`count(distinct ${schema.mealTypeToRecipeCategory.mealTypeId}) > ${mealTypesIds.wanted.length - 1}`
        : undefined,
    );
}

function createDishTypeSubQuery(dishTypesIds: ItemsIdsWantedOrNot) {
  const conditions = createSubQueryConditions(dishTypesIds, schema.dishType.id);
  if (!conditions) return null;
  return db
    .select(recipeCategorySelectType)
    .from(schema.recipesCategory)
    .innerJoin(
      schema.recipe,
      eq(schema.recipe.recipesCategoryId, schema.recipesCategory.id),
    )
    .innerJoin(
      schema.dishType,
      eq(schema.dishType.id, schema.recipesCategory.dishTypeId),
    )
    .where(and(...conditions))
    .groupBy(schema.recipesCategory.id);
}
