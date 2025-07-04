export default defineTask({
  meta: {
    name: 'db:clear',
    description: 'Run database clear tables',
  },
  async run() {
    console.log('Running DB clear task...');
    await useDrizzle().delete(tables.mealTypeToRecipeCategory);
    await useDrizzle().delete(tables.recipeToUstensil);
    await useDrizzle().delete(tables.recipeIngredient);
    await useDrizzle().delete(tables.allergenToRecipe);
    await useDrizzle().delete(tables.allergen);
    await useDrizzle().delete(tables.mealType);
    await useDrizzle().delete(tables.dishType);
    await useDrizzle().delete(tables.allergen);
    await useDrizzle().delete(tables.season);
    await useDrizzle().delete(tables.foodType);
    await useDrizzle().delete(tables.ustensil);
    await useDrizzle().delete(tables.unit);
    await useDrizzle().delete(tables.sequence);
    await useDrizzle().delete(tables.ingredient);
    await useDrizzle().delete(tables.recipe);
    await useDrizzle().delete(tables.recipesCategory);
    await useDrizzle().delete(tables.user);
    return { result: 'success' };
  },
});
