<script setup lang="ts">
const items = ref([
  {
    label: 'Catégories de recettes et recettes créés',
    icon: 'i-lucide-circle-help',
    slot: 'recipes',
  },
  {
    label: 'Ingrédients créés',
    icon: 'i-lucide-circle-help',
    slot: 'ingredients',
  },
  {
    label: 'Ustensiles créés',
    icon: 'i-lucide-circle-help',
    slot: 'ustensils',
  },
]);
</script>

<template>
  <UPage>
    <UPageAccordion :items="items">
      <template #recipes>
        <UCard variant="soft">
          <DashboardRecipesTableComponent />
        </UCard>
      </template>
      <template #ingredients>
        <UCard variant="soft">
          <DashboardIngredientsTableComponent />
        </UCard>
      </template>
      <template #ustensils>
        <UCard variant="soft">
          <DashboardUstensilsTableComponent />
        </UCard>
      </template>
    </UPageAccordion>
  </UPage>
</template>
