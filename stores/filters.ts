// stores/recipeFilter.ts
import type { SerializeObject } from 'nitropack';
import { defineStore } from 'pinia';

interface State {
	ustensils: FilterItem;
	ingredients: FilterItem;
	seasons: FilterItem;
	mealTypes: FilterItem;
	dishTypes: FilterItem;
	recipeCategoryList:
		| SerializeObject<{
				id: number;
				name: string;
				createdById: number | null;
				createdAt: Date;
				updatedAt: Date | null;
		  }>[]
		| null;
}

export const useFiltersStore = defineStore('filters', {
	// generate the store for filtering a list of ustensils
	state: (): State => {
		return {
			ingredients: {
				wanted: [],
				notWanted: [],
			},
			ustensils: {
				wanted: [],
				notWanted: [],
			},
			seasons: {
				wanted: [],
				notWanted: [],
			},
			mealTypes: {
				wanted: [],
				notWanted: [],
			},
			dishTypes: {
				wanted: [],
				notWanted: [],
			},
			recipeCategoryList: [],
		};
	},
	actions: {
		async fetchFilteredRecipes() {
			const response = await $fetch('/api/recipesCategories/filtered', {
				method: 'GET',
				params: {
					ingredients: {
						wanted: this.ingredients.wanted,
						notWanted: this.ingredients.notWanted,
					},
					ustensils: {
						wanted: this.ustensils.wanted,
						notWanted: this.ustensils.notWanted,
					},
					seasons: {
						wanted: this.seasons.wanted,
						notWanted: this.seasons.notWanted,
					},
					mealTypes: {
						wanted: this.mealTypes.wanted,
						notWanted: this.mealTypes.notWanted,
					},
					dishTypes: {
						wanted: this.dishTypes.wanted,
						notWanted: this.dishTypes.notWanted,
					},
				},
			});
			this.recipeCategoryList = response;
		},

		async updateLists(
			id: number,
			wanted: boolean | null,
			dataType: string,
		): Promise<void> {
			type ObjectKey = keyof typeof this;
			const dataTypeKey = dataType as ObjectKey;
			if (this[dataTypeKey] === null) {
				return;
			}
			if (wanted === null) {
				(this[dataTypeKey] as FilterItem).notWanted = (
					this[dataTypeKey] as FilterItem
				).notWanted.filter((itemId: number) => itemId !== id);
				(this[dataTypeKey] as FilterItem).wanted = (
					this[dataTypeKey] as FilterItem
				).wanted.filter((itemId: number) => itemId !== id);
			} else if (wanted) {
				if (!(this[dataTypeKey] as FilterItem).wanted.includes(id)) {
					(this[dataTypeKey] as FilterItem).wanted.push(id);
				}
				(this[dataTypeKey] as FilterItem).notWanted = (
					this[dataTypeKey] as FilterItem
				).notWanted.filter((itemId: number) => itemId !== id);
			} else {
				if (!(this[dataTypeKey] as FilterItem).notWanted.includes(id)) {
					(this[dataTypeKey] as FilterItem).notWanted.push(id);
				}
				(this[dataTypeKey] as FilterItem).wanted = (
					this[dataTypeKey] as FilterItem
				).wanted.filter((itemId: number) => itemId !== id);
			}
			await this.fetchFilteredRecipes();
		},

		resetFilters() {
			this.ingredients.wanted = [];
			this.ingredients.notWanted = [];
			this.ustensils.wanted = [];
			this.ustensils.notWanted = [];
			this.seasons.wanted = [];
			this.seasons.notWanted = [];
			this.mealTypes.wanted = [];
			this.mealTypes.notWanted = [];
			this.dishTypes.wanted = [];
			this.dishTypes.notWanted = [];
		},
	},
	getters: {
		getIngredientsIdsWanted: (state) => state.ingredients.wanted,
		getIngredientsIdsNotWanted: (state) => state.ingredients.notWanted,
		getUstensilsIdsWanted: (state) => state.ustensils.wanted,
		getUstensilsIdsNotWanted: (state) => state.ustensils.notWanted,
		getSeasonsIdsWanted: (state) => state.seasons.wanted,
		getSeasonsIdsNotWanted: (state) => state.seasons.notWanted,
		getMealTypesIdsWanted: (state) => state.mealTypes.wanted,
		getMealTypesIdsNotWanted: (state) => state.mealTypes.notWanted,
		getDishTypesIdsWanted: (state) => state.dishTypes.wanted,
		getDishTypesIdsNotWanted: (state) => state.dishTypes.notWanted,
	},
});

export enum DataType {
	Ustensil = 'ustensils',
	Ingredient = 'ingredients',
	Season = 'seasons',
	Allergen = 'allergens',
	MealType = 'mealTypes',
	DishType = 'dishTypes',
}

export interface FilterItem {
	wanted: number[];
	notWanted: number[];
}
