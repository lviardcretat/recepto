// stores/recipeFilter.ts
import type { SerializeObject } from 'nitropack';
import { defineStore } from 'pinia';

interface State {
	ustensilsIdWanted: number[];
	ustensilsIdNotWanted: number[];
	ingredientsIdWanted: number[];
	ingredientsIdNotWanted: number[];
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
			ustensilsIdWanted: [],
			ustensilsIdNotWanted: [],
			ingredientsIdWanted: [],
			ingredientsIdNotWanted: [],
			recipeCategoryList: [],
		};
	},
	actions: {
		async fetchFilteredRecipes() {
			const response = await $fetch('/api/recipesCategories/filtered', {
				method: 'GET',
				params: {
					ustensilsIdWanted: this.ustensilsIdWanted,
					ustensilsIdNotWanted: this.ustensilsIdNotWanted,
					ingredientsIdWanted: this.ingredientsIdWanted,
					ingredientsIdNotWanted: this.ingredientsIdNotWanted,
				},
			});
			this.recipeCategoryList = response;
		},

		async updateLists(
			id: number,
			wanted: boolean | null,
			dataType: DataType,
		): Promise<void> {
			switch (dataType) {
				case DataType.Ustensil:
					if (wanted === null) {
						this.ustensilsIdNotWanted = this.ustensilsIdNotWanted.filter(
							(ustensilId) => ustensilId !== id,
						);
						this.ustensilsIdWanted = this.ustensilsIdWanted.filter(
							(ustensilId) => ustensilId !== id,
						);
					} else if (wanted) {
						if (!this.ustensilsIdWanted.includes(id)) {
							this.ustensilsIdWanted.push(id);
						}
						this.ustensilsIdNotWanted = this.ustensilsIdNotWanted.filter(
							(ustensilId) => ustensilId !== id,
						);
					} else {
						if (!this.ustensilsIdNotWanted.includes(id)) {
							this.ustensilsIdNotWanted.push(id);
						}
						this.ustensilsIdWanted = this.ustensilsIdWanted.filter(
							(ustensilId) => ustensilId !== id,
						);
					}
					break;
				case DataType.Ingredient:
					if (wanted === null) {
						this.ingredientsIdNotWanted = this.ingredientsIdNotWanted.filter(
							(ingredientId) => ingredientId !== id,
						);
						this.ingredientsIdWanted = this.ingredientsIdWanted.filter(
							(ingredientId) => ingredientId !== id,
						);
					} else if (wanted) {
						if (!this.ingredientsIdWanted.includes(id)) {
							this.ingredientsIdWanted.push(id);
						}
						this.ingredientsIdNotWanted = this.ingredientsIdNotWanted.filter(
							(ingredientId) => ingredientId !== id,
						);
					} else {
						if (!this.ingredientsIdNotWanted.includes(id)) {
							this.ingredientsIdNotWanted.push(id);
						}
						this.ingredientsIdWanted = this.ingredientsIdWanted.filter(
							(ingredientId) => ingredientId !== id,
						);
					}
					break;
			}
			await this.fetchFilteredRecipes();
		},

		resetFilters() {
			this.ustensilsIdWanted = [];
			this.ustensilsIdNotWanted = [];
			this.ingredientsIdWanted = [];
			this.ingredientsIdNotWanted = [];
		},
	},
	getters: {
		getustensilsIdWanted: (state) => state.ustensilsIdWanted,
		getustensilsIdNotWanted: (state) => state.ustensilsIdNotWanted,
		getingredientsIdWanted: (state) => state.ingredientsIdWanted,
		getingredientsIdNotWanted: (state) => state.ingredientsIdNotWanted,
	},
});

export enum DataType {
	Ustensil = 'ustensil',
	Ingredient = 'ingredient',
}
