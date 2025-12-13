import { allergensSeed } from '../db/seed/allergen';
import { dishTypesSeed } from '../db/seed/dishType';
import { foodTypesSeed } from '../db/seed/foodType';
import { ingredientsSeed } from '../db/seed/ingredient';
import { mealTypesSeed } from '../db/seed/mealType';
import { seasonsSeed } from '../db/seed/season';
import { unitsSeed } from '../db/seed/unit';
import { ustensilsSeed } from '../db/seed/ustensil';

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Run database seed task',
  },
  async run() {
    console.log('Running DB seed task...');
    // await db.insert(schema.user).values(usersSeed);
    await db.insert(schema.mealType).values(mealTypesSeed);
    await db.insert(schema.dishType).values(dishTypesSeed);
    await db.insert(schema.allergen).values(allergensSeed);
    await db.insert(schema.season).values(seasonsSeed);
    await db.insert(schema.foodType).values(foodTypesSeed);
    await db.insert(schema.ustensil).values(ustensilsSeed);
    /* await db
      .insert(schema.recipesCategory)
      .values(recipesCategorySeed); */
    await autoChunkUtils(
      {
        items: ingredientsSeed,
      },
      chunk => db.insert(schema.ingredient).values(chunk),
    );
    await db.insert(schema.unit).values(unitsSeed);
    // await db.insert(schema.recipe).values(recipesSeed);
    /* await db
      .insert(schema.recipeToUstensil)
      .values(recipeToUstensilsSeed);
    await db.insert(schema.sequence).values(sequencesSeed);
    await db
      .insert(schema.mealTypeToRecipeCategory)
      .values(mealTypeToRecipeCategoriesSeed)
    await db
      .insert(schema.allergenToRecipe)
      .values(allergenToRecipesSeed);
    await db
      .insert(schema.recipeIngredient)
      .values(recipeIngredientsSeed); */
    return { result: 'success' };
  },
});
