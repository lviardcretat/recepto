import {
  lte,
  gte,
  inArray,
  notInArray,
  eq,
  count,
} from 'drizzle-orm';
import type { SQL } from 'drizzle-orm';
import type { SQLiteColumn } from 'drizzle-orm/sqlite-core';
import type { IItemsIdsWantedOrNot } from '~/types/filter/items';
import type { FilterSelectItemSchema } from '~/schemas/filter';

/** Select type for recipe category queries with id, name, and recipe count */
export const recipeCategorySelectType = {
  id: schema.recipesCategory.id,
  name: schema.recipesCategory.name,
  count: count(schema.recipe.id),
};
/** Select type for recipe queries with essential recipe fields */
export const recipeSelectType = {
  id: schema.recipe.id,
  name: schema.recipe.name,
  peopleNumber: schema.recipe.peopleNumber,
  cookingTime: schema.recipe.cookingTime,
  preparationTime: schema.recipe.preparationTime,
  restTime: schema.recipe.restTime,
  description: schema.recipe.description,
  seasonId: schema.recipe.seasonId,
  createdAt: schema.recipe.createdAt,
};

/**
 * Checks if all the filters lists are empty or undefined
 *
 * @param filtersListsIds - All the filters lists
 *
 * @returns True if all the filters lists are empty
 */
export function areAllEmpty(...filtersListsIds: FilterSelectItemSchema[]): boolean {
  return filtersListsIds.every(
    list =>
      (list.wanted === undefined || list.wanted.length === 0)
      && (list.notWanted === undefined || list.notWanted.length === 0),
  );
}

/**
 * Creates a subquery for filtering by ingredients.
 * Filters recipes that contain wanted ingredients and exclude not wanted ones.
 *
 * @param ingredientsIds - Object containing wanted and not wanted ingredient IDs
 * @param recipeCategoryId - Optional recipe category ID to filter within
 * @returns Database query builder or null if no conditions apply
 */
export function createIngredientSubQuery(
  ingredientsIds: IItemsIdsWantedOrNot,
  recipeCategoryId: number | null = null,
) {
  const conditions = createSubQueryConditions(
    ingredientsIds,
    schema.recipeIngredient.ingredientId,
  );
  if (!conditions) return null;
  if (recipeCategoryId)
    conditions.push(eq(schema.recipesCategory.id, recipeCategoryId));
  return db
    .select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
    .from(schema.recipesCategory)
    .innerJoin(
      schema.recipe,
      eq(schema.recipe.recipesCategoryId, schema.recipesCategory.id),
    )
    .innerJoin(
      schema.recipeIngredient,
      eq(schema.recipeIngredient.recipeId, schema.recipe.id),
    )
    .where(and(...conditions))
    .groupBy(schema.recipesCategory.id, schema.recipe.id)
    .having(
      ingredientsIds.wanted.length > 0
        ? sql`count(distinct ${schema.recipeIngredient.ingredientId}) > ${ingredientsIds.wanted.length - 1}`
        : undefined,
    );
}

/**
 * Creates a subquery for filtering by utensils.
 * Filters recipes that require wanted utensils and exclude not wanted ones.
 *
 * @param ustensilsIds - Object containing wanted and not wanted utensil IDs
 * @param recipeCategoryId - Optional recipe category ID to filter within
 * @returns Database query builder or null if no conditions apply
 */
export function createUstensilSubQuery(
  ustensilsIds: IItemsIdsWantedOrNot,
  recipeCategoryId: number | null = null,
) {
  const conditions = createSubQueryConditions(
    ustensilsIds,
    schema.recipeToUstensil.ustensilId,
  );
  if (!conditions) return null;
  if (recipeCategoryId)
    conditions.push(eq(schema.recipesCategory.id, recipeCategoryId));
  return db
    .select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
    .from(schema.recipesCategory)
    .innerJoin(
      schema.recipe,
      eq(schema.recipe.recipesCategoryId, schema.recipesCategory.id),
    )
    .innerJoin(
      schema.recipeToUstensil,
      eq(schema.recipeToUstensil.recipeId, schema.recipe.id),
    )
    .where(and(...conditions))
    .groupBy(schema.recipesCategory.id, schema.recipe.id)
    .having(
      ustensilsIds.wanted.length > 0
        ? sql`count(distinct ${schema.recipeToUstensil.ustensilId}) > ${ustensilsIds.wanted.length - 1}`
        : undefined,
    );
}

/**
 * Creates a subquery for filtering by allergens.
 * Filters recipes that contain the specified allergens.
 *
 * @param allergensIds - Array of allergen IDs to filter by
 * @param recipeCategoryId - Optional recipe category ID to filter within
 * @returns Database query builder or null if no conditions apply
 */
export function createAllergenSubQuery(
  allergensIds: number[],
  recipeCategoryId: number | null = null,
) {
  const conditions = createSubQueryConditions(
    allergensIds,
    schema.allergenToRecipe.allergenId,
  );
  if (!conditions) return null;
  if (recipeCategoryId)
    conditions.push(eq(schema.recipesCategory.id, recipeCategoryId));
  return db
    .select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
    .from(schema.recipesCategory)
    .innerJoin(
      schema.recipe,
      eq(schema.recipe.recipesCategoryId, schema.recipesCategory.id),
    )
    .innerJoin(
      schema.allergenToRecipe,
      eq(schema.allergenToRecipe.recipeId, schema.recipe.id),
    )
    .where(and(...conditions))
    .groupBy(schema.recipesCategory.id, schema.recipe.id)
    .having(
      allergensIds.length > 0
        ? sql`count(distinct ${schema.allergenToRecipe.allergenId}) > ${allergensIds.length - 1}`
        : undefined,
    );
}

/**
 * Creates a subquery for filtering seasonal recipes.
 * Filters recipes based on current date matching the recipe's season range.
 *
 * @param seasonalRecipes - Whether to apply seasonal filtering
 * @param recipeCategoryId - Optional recipe category ID to filter within
 * @returns Database query builder or null if seasonal filtering is disabled
 */
export function createSeasonalRecipeSubQuery(
  seasonalRecipes: boolean,
  recipeCategoryId: number | null = null,
) {
  if (!seasonalRecipes) return null;
  const conditions = [];
  if (recipeCategoryId)
    conditions.push(eq(schema.recipesCategory.id, recipeCategoryId));
  conditions.push(lte(schema.season.start, dateIntoDayNumber()));
  conditions.push(gte(schema.season.end, dateIntoDayNumber()));
  return db
    .select(recipeCategoryId ? recipeSelectType : recipeCategorySelectType)
    .from(schema.recipesCategory)
    .innerJoin(
      schema.recipe,
      eq(schema.recipe.recipesCategoryId, schema.recipesCategory.id),
    )
    .innerJoin(schema.season, eq(schema.season.id, schema.recipe.seasonId))
    .where(and(...conditions))
    .groupBy(schema.recipesCategory.id, schema.recipe.id);
}

/**
 * Creates SQL conditions for subquery filtering.
 * Handles both simple ID arrays and wanted/notWanted filter objects.
 *
 * @template T - The SQLite column type
 * @param ids - Either an array of IDs or an object with wanted/notWanted arrays
 * @param sqliteColumn - The database column to filter on
 * @returns Array of SQL conditions or null if no conditions apply
 */
export function createSubQueryConditions<T extends SQLiteColumn>(
  ids: IItemsIdsWantedOrNot | number[],
  sqliteColumn: T,
): SQL[] | null {
  const conditions: SQL[] = [];
  if (Array.isArray(ids)) {
    // If we're dealing with an icon filter like for allegens
    if (ids.length > 0) {
      conditions.push(inArray(sqliteColumn, ids));
    }
    else {
      return null;
    }
  }
  else {
    // If we have to deal with a filter through a select
    if (ids.wanted.length > 0) {
      conditions.push(inArray(sqliteColumn, ids.wanted));
    }
    if (ids.notWanted.length > 0) {
      conditions.push(notInArray(sqliteColumn, ids.notWanted));
    }
    if (conditions.length === 0) {
      return null;
    }
  }
  return conditions;
}
