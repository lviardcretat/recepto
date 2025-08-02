/**
 * @description Recipe custom model with all data needed for card details
 * @type RecipeDetail
 */
export type RecipeDetail = {
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
};
