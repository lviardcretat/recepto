<template>
	<main class="recipe-content">
	  <RecipeFilter/>
	  <NuxtLink to="{ name: 'recipes-id', params: { id: 1 } ">Home page</NuxtLink>
	</main>
</template>

<style lang="scss">
	.recipe-content {
		width: 100vw;
		height: 100vh;
		display: flex;
	}
</style>
