<template>
  <div class="recipeSearchBar">
	<UInput
		:trailing="false"
		icon="material-symbols:search"
		color="white"
		placeholder="Search a recipe ..."
		size="xl"
		v-model="searchValue"
		autocomplete="on"
		class="search"
	/>
	<div
		class="categoryRecipes"
		v-if="names?.length > 0"
	>
		<ULink
			class="categoryRecipe"
			v-for="(recipeCategory) in names"
			:to="{ name: 'recipes-id', params: {id: recipeCategory.id}}"
		>
			{{
				recipeCategory.name
			}}
			<div class="recipes">
				<div class="recipe" v-for="(recipe) in recipeCategory.recipes">
					<UIcon
						name="material-symbols:subdirectory-arrow-right-rounded"
						size="xl"
					/>
					<ULink :to="{ name: 'recipes-id', params: {id: recipeCategory.id}}">
						{{
							recipe.name
						}}
					</ULink>
				</div>
			</div>
		</ULink>
	</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const searchValue = ref<string>(''); // Valeur de recherche
const names = ref(); // Stocke les catégories de recettes



// Fonction pour fetcher les données
const fetchCategories = async (search: string) => {
	let { data } = await useFetch('/api/recipesCategories/search', {
		query: {
		name: search, // Envoie la valeur de recherche comme paramètre
		},
	});

	return data.value || [];
};

// Surveille les changements de searchValue
watch(searchValue, async (newValue) => {
	if (newValue.length > 0) {
		names.value = await fetchCategories(newValue);
	} else {
		names.value = {};
	}
});
</script>

<style lang="scss">
	.recipeSearchBar {
		display: flex;
		flex-direction: column;
		position: relative;

		> .search {
			position: sticky;
			top: 0;
			z-index: 1;
		}

		> .categoryRecipes {
			display: flex;
			flex-direction: column;
			align-items: start;
			row-gap: 10px;
			outline: 1px solid rgb(107, 114, 128);
			border-radius: 6px;
			width: 100%;
			position: absolute;
			top: 44px;
			padding: 5px;
			box-shadow: 2px 4px 6px black;
			transition: background-color 0.3s;

			> .categoryRecipe {
				display: flex;
				flex-direction: column;
				align-items: start;
				width: 100%;
				padding: 2px;
				border-radius: 3px;
				transition: background-color 0.3s;

				> .recipes {
					display: flex;
					flex-direction: column;
					align-items: start;
					width: 100%;

					> .recipe {
						display: flex;
						flex-direction: row;
						align-items: center;
						width: 100%;
						border-radius: 3px;
						transition: background-color 0.3s;
					}
				}
			}
		}
	}

	html.light {
		.recipeSearchBar > .categoryRecipes {
			background-color: rgba(0, 0, 0, 0.05);

			> .categoryRecipe > .recipes {
				> .recipe:hover {
						background-color: rgba(0, 0, 0, 0.1);
				}
			}

			> .categoryRecipe:hover {
					background-color: rgba(0, 0, 0, 0.1);
			}
		}
	}

	html.dark {
		.recipeSearchBar > .categoryRecipes {
			background-color: rgba(255, 255, 255, 0.05);

			> .categoryRecipe > .recipes {
				> .recipe:hover {
						background-color: rgba(255, 255, 255, 0.1);
				}
			}

			> .categoryRecipe:hover {
					background-color: rgba(255, 255, 255, 0.1);
			}
		}
	}
</style>
