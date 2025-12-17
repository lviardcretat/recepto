/* eslint-disable @typescript-eslint/consistent-type-imports */
import * as schema from 'hub:db:schema';
import 'dotenv/config';

export { sql, eq, and, or } from 'drizzle-orm';

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
