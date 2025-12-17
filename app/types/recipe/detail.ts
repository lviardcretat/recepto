import type { Recipe } from '~~/server/utils/drizzleUtils';

/**
 * Recipe custom model with all data needed for card details
 */
export interface IRecipeDetail {
  id: number;
  name: string;
  peopleNumber: number | null;
  cookingTime: number | null;
  preparationTime: number | null;
  restTime: number | null;
  description: string | null;
  tips: string | null;
  seasonId: number;
  createdAt: string;
  allergens: { allergen: { name: string; icon: string | null } }[];
  ingredients: {
    quantity: number;
    ingredient: { name: string };
    unit: { shortForm: string } | null;
  }[];
  sequences: { id: number; name: string; extra: string | null }[];
  ustensils: { ustensil: { name: string } }[];
  createdBy: { username: string };
}

/**
 * Recipe with all data for editing
 */
export interface IRecipeWithAllData extends Recipe {
  ingredients: { ingredientId: number; quantity: number; unitId?: number }[];
  sequences: { name: string; extra?: string }[];
  allergens: number[];
  ustensils: number[];
}

/**
 * Recipe custom model with less data
 */
export interface IRecipeWithLessData {
  id: number;
  name: string;
  peopleNumber: number;
  cookingTime: number | null;
  preparationTime: number | null;
  restTime: number | null;
  description: string | null | undefined;
  seasonId: number;
  createdAt: string;
  createdBy: string | null;
}
