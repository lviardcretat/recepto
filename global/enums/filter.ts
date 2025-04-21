/**
 * @description States type of the result filter
 * @enum {string}
 */
export enum FilterResultStatesType {
	Recipe = 'recipes',
	RecipesCategories = 'recipesCategories',
}

/**
 * @description States type of the SelectMenu filter
 * @enum {string}
 */
export enum FilterSelectMenuStatesType {
	Ustensil = 'ustensils',
	Ingredient = 'ingredients',
	MealType = 'mealTypes',
	DishType = 'dishTypes',
}

/**
 * @description States type of the IconsGrid filter.
 * @enum {string}
 */
export enum FilterIconsGridStatesType {
	Allergen = 'allergens',
}

/**
 * @description Accordions slots.
 * @enum {string}
 */
export enum FilterAccordionsSlots {
	Select = 'select',
	Switch = 'switch',
	Grid = 'grid',
}

/**
 * @description Data type of the filter
 * @enum {string}
 */
export enum FilterAccordionsDataType {
	Ustensil = 'ustensils',
	Ingredient = 'ingredients',
	Season = 'seasons',
	Allergen = 'allergens',
	MealType = 'mealTypes',
	DishType = 'dishTypes',
}
