import * as userSchema from '../database/schema/user';
import * as foodTypeSchema from '../database/schema/foodType';
import * as ingredientSchema from '../database/schema/ingredient';
import * as recipesCategorySchema from '../database/schema/recipesCategory';
import * as recipeSchema from '../database/schema/recipe';
import * as recipeIngredientSchema from '../database/schema/recipeIngredient';
import * as sequenceSchema from '../database/schema/sequence';
import * as ustensilSchema from '../database/schema/ustensil';
import * as seasonSchema from '../database/schema/season';
import * as unitSchema from '../database/schema/unit';
import * as mealTypeSchema from '../database/schema/mealType';
import * as dishTypeSchema from '../database/schema/dishType';
import * as allergenSchema from '../database/schema/allergen';
import * as allergenToRecipeSchema from '../database/schema/allergenToRecipe';
import * as mealTypeToRecipeCategorySchema from '../database/schema/mealTypeToRecipeCategory';
import * as recipeToUstensilSchema from '../database/schema/recipeToUstensil';
import * as accountSchema from '../database/schema/account';
import * as verificationSchema from '../database/schema/verification';
import * as sessionSchema from '../database/schema/session';
import 'dotenv/config';
/* Uncomment this for local bdd
import { drizzle } from 'drizzle-orm/libsql'; */
import { drizzle } from 'drizzle-orm/d1';

export { sql, eq, and, or } from 'drizzle-orm'; // Comment this for local bdd

export const schema = {
  ...userSchema,
  ...foodTypeSchema,
  ...ingredientSchema,
  ...recipesCategorySchema,
  ...recipeSchema,
  ...recipeIngredientSchema,
  ...sequenceSchema,
  ...ustensilSchema,
  ...seasonSchema,
  ...unitSchema,
  ...mealTypeSchema,
  ...dishTypeSchema,
  ...allergenSchema,
  ...allergenToRecipeSchema,
  ...mealTypeToRecipeCategorySchema,
  ...recipeToUstensilSchema,
  ...accountSchema,
  ...verificationSchema,
  ...sessionSchema,
};

export const tables = schema;

export function useDrizzle() {
  // Comment this for local bdd
  return drizzle(hubDatabase(), { schema, casing: 'snake_case' });
  /* Uncomment this for local bdd
  return drizzle(process.env.DB_FILE_NAME!, { schema, casing: 'snake_case' }); */
}

export type User = typeof schema.user.$inferSelect;
export type UserInsert = typeof schema.user.$inferInsert;

export type FoodType = typeof schema.foodType.$inferSelect;
export type FoodTypeInsert = typeof schema.foodType.$inferInsert;

export type Ingredient = typeof schema.ingredient.$inferSelect;
export type IngredientInsert = typeof schema.ingredient.$inferInsert;

export type RecipesCategory = typeof schema.recipesCategory.$inferSelect;
export type RecipesCategoryInsert = typeof schema.recipesCategory.$inferInsert;

export type Recipe = typeof schema.recipe.$inferSelect;
export type RecipeInsert = typeof schema.recipe.$inferInsert;

export type RecipeIngredient = typeof schema.recipeIngredient.$inferSelect;
export type RecipeIngredientInsert = typeof schema.recipeIngredient.$inferInsert;

export type Sequence = typeof schema.sequence.$inferSelect;
export type SequenceInsert = typeof schema.sequence.$inferInsert;

export type Ustensil = typeof schema.ustensil.$inferSelect;
export type UstensilInsert = typeof schema.ustensil.$inferInsert;

export type Season = typeof schema.season.$inferSelect;
export type SeasonInsert = typeof schema.season.$inferInsert;

export type Unit = typeof schema.unit.$inferSelect;
export type UnitInsert = typeof schema.unit.$inferInsert;

export type MealType = typeof schema.mealType.$inferSelect;
export type MealTypeInsert = typeof schema.mealType.$inferInsert;

export type DishType = typeof schema.dishType.$inferSelect;
export type DishTypeInsert = typeof schema.dishType.$inferInsert;

export type Allergen = typeof schema.allergen.$inferSelect;
export type AllergenInsert = typeof schema.allergen.$inferInsert;

export type AllergenToRecipe = typeof schema.allergenToRecipe.$inferSelect;
export type AllergenToRecipeInsert = typeof schema.allergenToRecipe.$inferInsert;

export type MealTypeToRecipeCategory = typeof schema.mealTypeToRecipeCategory.$inferSelect;
export type MealTypeToRecipeCategoryInsert = typeof schema.mealTypeToRecipeCategory.$inferInsert;

export type RecipeToUstensil = typeof schema.recipeToUstensil.$inferSelect;
export type RecipeToUstensilInsert = typeof schema.recipeToUstensil.$inferInsert;
