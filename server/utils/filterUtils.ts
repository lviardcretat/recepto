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
import type { FilterSelectItem } from '~/schemas/filter';

export const recipeCategorySelectType = {
  id: schema.recipesCategory.id,
  name: schema.recipesCategory.name,
  count: count(schema.recipe.id),
};
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
export function areAllEmpty(...filtersListsIds: FilterSelectItem[]): boolean {
  return filtersListsIds.every(
    list =>
      (list.wanted === undefined || list.wanted.length === 0)
      && (list.notWanted === undefined || list.notWanted.length === 0),
  );
}

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
