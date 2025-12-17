export default defineTask({
  meta: {
    name: 'db:clear',
    description: 'Run database clear tables',
  },
  async run() {
    console.log('Running DB clear task...');
    await db.delete(schema.mealTypeToRecipeCategory);
    await db.delete(schema.recipeToUstensil);
    await db.delete(schema.recipeIngredient);
    await db.delete(schema.allergenToRecipe);
    await db.delete(schema.allergen);
    await db.delete(schema.mealType);
    await db.delete(schema.dishType);
    await db.delete(schema.allergen);
    await db.delete(schema.season);
    await db.delete(schema.foodType);
    await db.delete(schema.ustensil);
    await db.delete(schema.unit);
    await db.delete(schema.sequence);
    await db.delete(schema.ingredient);
    await db.delete(schema.recipe);
    await db.delete(schema.recipesCategory);
    await db.delete(schema.user);
    return { result: 'success' };
  },
});
