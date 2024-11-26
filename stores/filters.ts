// stores/recipeFilter.ts
import { defineStore } from 'pinia';

interface State {
	ustensilsIdWanted: number[];
	ustensilsIdNotWanted: number[];
	ingredientsIdUsed: number[];
	ingredientsIdNotWanted: number[];
}

export const useFiltersStore = defineStore('filters', {
	// generate the store for filtering a list of ustensils
	state: (): State => {
		return {
			ustensilsIdWanted: [],
			ustensilsIdNotWanted: [],
			ingredientsIdUsed: [],
			ingredientsIdNotWanted: [],
		};
	},
	actions: {
		updateLists(id: number, wanted: boolean | null, dataType: DataType): void {
			if (wanted === null) {
				this.ustensilsIdNotWanted = this.ustensilsIdNotWanted.filter(
					(ustensilId) => ustensilId !== id,
				);
				this.ustensilsIdWanted = this.ustensilsIdWanted.filter(
					(ustensilId) => ustensilId !== id,
				);
				return;
			}
			if (dataType === DataType.Ustensil) {
				if (wanted) {
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
			}
		},

		// Nouvelle méthode pour réinitialiser les filtres
		resetFilters() {
			this.ustensilsIdWanted = [];
			this.ustensilsIdNotWanted = [];
			this.ingredientsIdUsed = [];
			this.ingredientsIdNotWanted = [];
		},
	},
	getters: {
		getustensilsIdWanted: (state) => state.ustensilsIdWanted,
		getustensilsIdNotWanted: (state) => state.ustensilsIdNotWanted,
		getingredientsIdWanted: (state) => state.ingredientsIdUsed,
		getingredientsIdNotWanted: (state) => state.ingredientsIdNotWanted,
		isNoFiltering: (state) =>
			state.ustensilsIdWanted.length === 0 &&
			state.ustensilsIdNotWanted.length === 0,
	},
});

export enum DataType {
	Ustensil = 'ustensil',
	Ingredient = 'ingredient',
}
