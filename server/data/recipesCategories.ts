import type { RecipesCategoriesFilterSchema } from '~/schemas/filter';
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
import type { IItemsIdsWantedOrNot } from '~/types/filter/items';
import type { IRecipesCategoriesWithLessData, IRecipeSearched } from '~/types/recipesCategory/detail';

/**
 * Creates a new recipe category in the database.
 * @param name - The name of the recipe category
 * @param dishTypeId - The ID of the associated dish type
 * @param createdById - The ID of the user creating the category
 * @returns The newly created recipe category
 */
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

/**
 * Retrieves all recipe categories from the database ordered by name.
 * @returns Array of all recipe categories
 */
export async function getRecipesCategories(): Promise<RecipesCategory[]> {
  const recipesCategories: RecipesCategory[] = await db
    .select()
    .from(schema.recipesCategory)
    .orderBy(schema.recipesCategory.name)
    .all();
  return recipesCategories;
}

/**
 * Retrieves all recipe categories with their associated recipe count.
 * @returns Array of recipe categories with id, name, and recipe count
 */
export async function getRecipesCategoriesWithRecipeCount(): Promise<IRecipesCategoriesWithLessData[]> {
  const recipesCategories: IRecipesCategoriesWithLessData[] = await db
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

/**
 * Retrieves all recipe categories with their associated recipe names for search functionality.
 * @returns Array of recipe categories with nested recipe names
 */
export async function getRecipesCategoriesAndRecipesNames(): Promise<IRecipeSearched[]> {
  const recipesCategoriesRecipes: IRecipeSearched[] = await db.query.recipesCategory.findMany({
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

/**
 * Retrieves only the name of a recipe category by its ID.
 * @param id - The unique identifier of the recipe category
 * @returns Object containing the name if found, undefined otherwise
 */
export async function getRecipesCategoryName(
  id: number,
): Promise<{ name: string } | undefined> {
  const recipesCategory: { name: string } | undefined = await db
    .select({
      name: schema.recipesCategory.name,
    })
    .from(schema.recipesCategory)
    .where(eq(schema.recipesCategory.id, id))
    .get();
  return recipesCategory;
}

/**
 * Retrieves a recipe category by its ID.
 * @param id - The unique identifier of the recipe category
 * @returns The recipe category if found, undefined otherwise
 */
export async function getRecipesCategory(
  id: number,
): Promise<RecipesCategory | undefined> {
  const recipesCategory: RecipesCategory | undefined = await db
    .select()
    .from(schema.recipesCategory)
    .where(eq(schema.recipesCategory.id, id))
    .get();
  return recipesCategory;
}

/**
 * Updates a recipe category with new data.
 * @param id - The unique identifier of the recipe category to update
 * @param data - The partial recipe category data to update
 * @returns The updated recipe category
 */
export async function updateRecipesCategory(
  id: number,
  data: Partial<RecipesCategoryInsert>,
): Promise<RecipesCategory> {
  const updatedRecipesCategory: RecipesCategory = await db
    .update(schema.recipesCategory)
    .set(data)
    .where(eq(schema.recipesCategory.id, id))
    .returning()
    .get();
  return updatedRecipesCategory;
}

/**
 * Deletes a recipe category by its ID.
 * @param id - The unique identifier of the recipe category to delete
 */
export async function deleteRecipesCategory(id: number): Promise<void> {
  await db
    .delete(schema.recipesCategory)
    .where(eq(schema.recipesCategory.id, id));
}

/**
 * Retrieves recipe categories filtered by multiple criteria.
 * Applies filters for ingredients, utensils, meal types, dish types, allergens, and seasonal recipes.
 * Returns all categories with recipe count if no filters are applied.
 *
 * @param query - Object containing all filter criteria
 * @returns Array of filtered recipe categories with id, name, and recipe count
 */
export async function getRecipesCategoriesFiltered(
  query: RecipesCategoriesFilterSchema,
): Promise<IRecipesCategoriesWithLessData[]> {
  const ingredientsIds: IItemsIdsWantedOrNot = query.ingredients;
  const ustensilsIds: IItemsIdsWantedOrNot = query.ustensils;
  const mealTypesIds: IItemsIdsWantedOrNot = query.mealTypes ?? {
    wanted: [],
    notWanted: [],
  };
  const dishTypesIds: IItemsIdsWantedOrNot = query.dishTypes ?? {
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

  let recipesCategories: IRecipesCategoriesWithLessData[] = [];
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
    ).all()) as unknown as IRecipesCategoriesWithLessData[];
  }
  else if (filters.length === 2) {
    recipesCategories = (await intersect(
      filters[0],
      filters[1],
    ).all()) as unknown as IRecipesCategoriesWithLessData[];
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

/**
 * Creates a subquery for filtering by meal types.
 * @param mealTypesIds - Object containing wanted and not wanted meal type IDs
 * @returns Database query builder or null if no conditions apply
 */
function createMealTypeSubQuery(mealTypesIds: IItemsIdsWantedOrNot) {
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

/**
 * Creates a subquery for filtering by dish types.
 * @param dishTypesIds - Object containing wanted and not wanted dish type IDs
 * @returns Database query builder or null if no conditions apply
 */
function createDishTypeSubQuery(dishTypesIds: IItemsIdsWantedOrNot) {
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
