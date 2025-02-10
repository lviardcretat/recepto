import { allergensSeed } from '../database/seed/allergen';
import { allergenToRecipesSeed } from '../database/seed/allergenToRecipe';
import { dishTypesSeed } from '../database/seed/dishType';
import { foodTypesSeed } from '../database/seed/foodType';
import { ingredientsSeed } from '../database/seed/ingredient';
import { mealTypesSeed } from '../database/seed/mealType';
import { mealTypeToRecipeCategoriesSeed } from '../database/seed/mealTypeToRecipeCategory';
import { recipesSeed } from '../database/seed/recipe';
import { recipeIngredientsSeed } from '../database/seed/recipeIngredient';
import { recipesCategorySeed } from '../database/seed/recipesCategory';
import { recipeToUstensilsSeed } from '../database/seed/recipeToUstensil';
import { seasonsSeed } from '../database/seed/season';
import { sequencesSeed } from '../database/seed/sequence';
import { unitsSeed } from '../database/seed/unit';
import { usersSeed } from '../database/seed/user';
import { ustensilsSeed } from '../database/seed/ustensil';

export default defineTask({
	meta: {
		name: 'db:seed',
		description: 'Run database seed task',
	},
	async run() {
		console.log('Running DB seed task...');
		await useDrizzle().insert(tables.user).values(usersSeed);
		await useDrizzle().insert(tables.mealType).values(mealTypesSeed);
		await useDrizzle().insert(tables.dishType).values(dishTypesSeed);
		await useDrizzle().insert(tables.allergen).values(allergensSeed);
		await useDrizzle().insert(tables.season).values(seasonsSeed);
		await useDrizzle().insert(tables.foodType).values(foodTypesSeed);
		await useDrizzle().insert(tables.ustensil).values(ustensilsSeed);
		await useDrizzle()
			.insert(tables.recipesCategory)
			.values(recipesCategorySeed);
		await useDrizzle().insert(tables.ingredient).values(ingredientsSeed);
		await useDrizzle().insert(tables.unit).values(unitsSeed);
		await useDrizzle().insert(tables.recipe).values(recipesSeed);
		await useDrizzle()
			.insert(tables.recipeToUstensil)
			.values(recipeToUstensilsSeed);
		await useDrizzle().insert(tables.sequence).values(sequencesSeed);
		await useDrizzle()
			.insert(tables.mealTypeToRecipeCategory)
			.values(mealTypeToRecipeCategoriesSeed);
		await useDrizzle()
			.insert(tables.allergenToRecipe)
			.values(allergenToRecipesSeed);
		await useDrizzle()
			.insert(tables.recipeIngredient)
			.values(recipeIngredientsSeed);
		return { result: 'success' };
	},
});
