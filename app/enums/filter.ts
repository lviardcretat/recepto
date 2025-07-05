/**
 * @description States type of the result filter
 * @enum {string}
 */
export enum FilterResultStatesType {
  RECIPE = 'recipes',
  RECIPES_CATEGORIES = 'recipesCategories',
}

/**
 * @description States type of the SelectMenu filter
 * @enum {string}
 */
export enum FilterSelectMenuStatesType {
  USTENSIL = 'ustensils',
  INGREDIENT = 'ingredients',
  MEAL_TYPE = 'mealTypes',
  DISH_TYPE = 'dishTypes',
}

/**
 * @description States type of the IconsGrid filter.
 * @enum {string}
 */
export enum FilterIconsGridStatesType {
  ALLERGEN = 'allergens',
}
