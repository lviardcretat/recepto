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
		v-if="recipeCategories?.length > 0"
	>
		<div v-if="totalRecipes > 0" class="recipesFound">
			{{
				totalRecipes + " recipes found."
			}}
		</div>
		<ULink
			class="categoryRecipe"
			v-for="(recipeCategory) in recipeCategories"
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

// Search value
const searchValue = ref<string>('');
// Store recipe categories and recipes
const recipeCategories = ref();


/**
 * Fetch recipe categories and recipes
 *
 * @param search The search user make
 */
const fetchCategories = async (search: string) => {
	let { data } = await useFetch('/api/recipesCategories/search', {
		query: {
		name: search,
		},
	});

	return data.value || [];
};

/**
 * Watch searchValue's changes
 */
watch(searchValue, async (newValue) => {
	if (newValue.length > 0) {
		recipeCategories.value = await fetchCategories(newValue);
	} else {
		recipeCategories.value = {};
	}
});

/**
 * Return the count of recipes found
 */
const totalRecipes = computed(() => {
	let result = 0;

	if (recipeCategories.value) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		result = recipeCategories.value.reduce((total: number, category: any) => {
			return total + (category?.recipes?.length || 0);
		}, 0);
	}

	return result;
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

			 > input {
				transition: background-color 0.3s;
			 }
		}

		> .categoryRecipes {
			display: flex;
			flex-direction: column;
			align-items: center;
			border: 1px solid rgb(107, 114, 128);
			border-radius: 6px;
			width: 100%;
			position: absolute;
			top: 44px;
			padding: 5px;
			box-shadow: 2px 4px 6px black;
			transition: background-color 0.3s;

			// Recipe category separator
			> .categoryRecipe:not(:last-child) {
				border-bottom: 1px solid #444;
				padding-bottom: 0.5rem;
			}

			> .categoryRecipe {
				display: flex;
				flex-direction: column;
				align-items: start;
				font-weight: bold;
				width: 100%;
				padding: 0.5rem;
				border-radius: 3px;
				transition: background-color 0.3s;
				cursor: pointer;

				> .recipes {
					display: flex;
					flex-direction: column;
					align-items: start;
					width: 100%;

					> .recipe {
						display: flex;
						flex-direction: row;
						align-items: center;
						font-weight: normal;
						color: #aaa;
						width: 100%;
						border-radius: 3px;
						transition: background-color 0.3s;
						cursor: pointer;

						> .iconify {
							color: #666;
						}
					}
				}
			}
		}
	}
	// Manage colors with light mode
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
	// Manage colors with dark mode
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
