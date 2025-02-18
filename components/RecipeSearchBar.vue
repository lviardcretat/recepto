<script lang="ts" setup>
import type { RecipeSearched } from '~/global/types';

// Search value
const searchValue = ref<string>('');
const { data, execute, clear } = useFetch<RecipeSearched[]>(
	'/api/recipesCategories/search',
	{
		method: 'GET',
		query: {
			name: searchValue,
		},
		immediate: false,
		default: () => [],
		watch: false,
		onResponseError({ response }) {
			throw showError({
				statusCode: response.status,
				statusMessage: response.statusText,
			});
		},
	},
);

watch(searchValue, async (newValue) => {
	if (newValue.trim().length > 0) {
		await execute();
	} else {
		clear();
	}
});

/**
 * Return the count of recipes found
 */
const totalRecipes = computed(() => {
	let result = 0;

	if (data.value) {
		result = data.value.reduce((total: number, category: RecipeSearched) => {
			return total + (category?.recipes?.length || 0);
		}, 0);
	}

	return result;
});
</script>

<template>
  <div class="recipeSearchBar">
	<UInput :trailing="false"
		icon="material-symbols:search"
		color="white"
		:placeholder="$t('findRecipe')"
		size="xl"
		v-model="searchValue"
		autocomplete="on"
		class="search"/>
	<div class="categoryRecipes"
		v-if="data && data.length > 0">
		<div v-if="totalRecipes > 0" class="recipesFound">
			{{ $t('recipesFound', totalRecipes, { count: totalRecipes }) }}
		</div>
		<ULink class="categoryRecipe"
			v-for="(recipeCategory) in data"
			:to="{
				name: 'recipes-id',
				params: {id: recipeCategory.id},
				query: {recipeIndex: 0}
			}">
			{{
				recipeCategory.name
			}}
			<div class="recipes">
				<div class="recipe" v-for="(recipe, index) in recipeCategory.recipes">
					<UIcon
						name="material-symbols:subdirectory-arrow-right-rounded"
						size="xl"
					/>
					<ULink :to="{
							name: 'recipes-id',
							params: {id: recipeCategory.id},
							query: {recipeIndex: index}
						}">
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
			backdrop-filter: blur(50px);
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
