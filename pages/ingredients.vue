<script setup lang="ts">
const { getIngredients } = useIngredients();
await getIngredients();
</script>

<template>
  <main class="ingredients-content">
    <RecipeFilter/>
    <AlternativeRecipesSelection/>
  </main>
</template>

<style lang="scss">
  .ingredients-content {
    width: 100vw;
    height: 100vh;
    display: flex;
  }
</style>
