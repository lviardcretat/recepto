import { defineStore } from 'pinia';
import type { FilterSelectItem, State } from '~/global/types';

export const useFiltersStore = defineStore('filters', {
	// generate the store for filtering a list of ustensils
	state: (): State => {
		return {
			filterNumber: 0,
			ingredients: {
				wanted: [],
				notWanted: [],
			},
			ustensils: {
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
			seasonalRecipes: false,
			recipeCategoryList: [],
			allergens: [],
		};
	},
	actions: {
		async fetchFilteredRecipes(filterNumberIncrement = 0): Promise<void> {
			const route = useRoute();
			this.filterNumber += filterNumberIncrement ?? 0;
			const needFilterRecipes: boolean = route.params.id !== undefined;
			const response = await $fetch(
				`/api/recipesCategories/${needFilterRecipes ? 'recipes/filtered' : 'filtered'}`,
				{
					method: 'GET',
					watch: false,
					immediate: false,
					default: () => [],
					query: {
						ingredients: {
							wanted: this.ingredients.wanted,
							notWanted: this.ingredients.notWanted,
						},
						ustensils: {
							wanted: this.ustensils.wanted,
							notWanted: this.ustensils.notWanted,
						},
						mealTypes: {
							...(!needFilterRecipes
								? [
										{
											wanted: this.mealTypes.wanted,
											notWanted: this.mealTypes.notWanted,
										},
									]
								: []),
						},
						dishTypes: {
							...(!needFilterRecipes
								? [
										{
											wanted: this.dishTypes.wanted,
											notWanted: this.dishTypes.notWanted,
										},
									]
								: []),
						},
						seasonalRecipes: this.seasonalRecipes,
						allergens: this.allergens,
						recipeCategoryId: route.params.id as string,
					},
					onResponseError({ response }) {
						throw showError({
							statusCode: response.status,
							statusMessage: response.statusText,
						});
					},
				},
			);
			this.recipeCategoryList = response;
		},

		async updateSelectLists(
			id: number,
			wanted: boolean | null,
			dataType: string,
		): Promise<void> {
			type ObjectKey = keyof typeof this;
			const dataTypeKey = dataType as ObjectKey;
			let filterNumberIncrement = 0;
			if (this[dataTypeKey] === null) {
				return;
			}
			if (wanted === null) {
				(this[dataTypeKey] as FilterSelectItem).notWanted = (
					this[dataTypeKey] as FilterSelectItem
				).notWanted.filter((itemId: number) => itemId !== id);
				(this[dataTypeKey] as FilterSelectItem).wanted = (
					this[dataTypeKey] as FilterSelectItem
				).wanted.filter((itemId: number) => itemId !== id);
				filterNumberIncrement = -1;
			} else if (wanted) {
				if (!(this[dataTypeKey] as FilterSelectItem).wanted.includes(id)) {
					(this[dataTypeKey] as FilterSelectItem).wanted.push(id);
				}
				if ((this[dataTypeKey] as FilterSelectItem).notWanted.includes(id)) {
					(this[dataTypeKey] as FilterSelectItem).notWanted = (
						this[dataTypeKey] as FilterSelectItem
					).notWanted.filter((itemId: number) => itemId !== id);
				} else {
					filterNumberIncrement += 1;
				}
			} else {
				if (!(this[dataTypeKey] as FilterSelectItem).notWanted.includes(id)) {
					(this[dataTypeKey] as FilterSelectItem).notWanted.push(id);
				}
				if ((this[dataTypeKey] as FilterSelectItem).wanted.includes(id)) {
					(this[dataTypeKey] as FilterSelectItem).wanted = (
						this[dataTypeKey] as FilterSelectItem
					).wanted.filter((itemId: number) => itemId !== id);
				} else {
					filterNumberIncrement += 1;
				}
			}
			await this.fetchFilteredRecipes(filterNumberIncrement);
		},

		async updateGridLists(
			id: number,
			active: boolean,
			dataType: string,
		): Promise<void> {
			type ObjectKey = keyof typeof this;
			const dataTypeKey = dataType as ObjectKey;
			let filterNumberIncrement = 0;
			if (this[dataTypeKey] === null) {
				return;
			}
			if (active) {
				filterNumberIncrement += 1;
				if (!(this[dataTypeKey] as number[]).includes(id)) {
					(this[dataTypeKey] as number[]).push(id);
				}
			} else {
				filterNumberIncrement -= 1;
				(this[dataTypeKey] as number[]) = (
					this[dataTypeKey] as number[]
				).filter((itemId: number) => itemId !== id);
			}
			await this.fetchFilteredRecipes(filterNumberIncrement);
		},

		resetFilters() {
			this.filterNumber = 0;
			this.ingredients.wanted = [];
			this.ingredients.notWanted = [];
			this.ustensils.wanted = [];
			this.ustensils.notWanted = [];
			this.mealTypes.wanted = [];
			this.mealTypes.notWanted = [];
			this.dishTypes.wanted = [];
			this.dishTypes.notWanted = [];
			this.seasonalRecipes = false;
			this.allergens = [];
		},
	},
	getters: {
		getFilterNumber: (state) => state.filterNumber,
		getIngredientsIdsWanted: (state) => state.ingredients.wanted,
		getIngredientsIdsNotWanted: (state) => state.ingredients.notWanted,
		getUstensilsIdsWanted: (state) => state.ustensils.wanted,
		getUstensilsIdsNotWanted: (state) => state.ustensils.notWanted,
		getMealTypesIdsWanted: (state) => state.mealTypes.wanted,
		getMealTypesIdsNotWanted: (state) => state.mealTypes.notWanted,
		getDishTypesIdsWanted: (state) => state.dishTypes.wanted,
		getDishTypesIdsNotWanted: (state) => state.dishTypes.notWanted,
		getSeasonalIngredients: (state) => state.seasonalRecipes,
		getAllergens: (state) => state.allergens,
	},
});
