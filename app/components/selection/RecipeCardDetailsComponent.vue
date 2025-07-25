<script lang="ts" setup>
import type { RecipeDetail } from '~/types/recipeCard';

const props = defineProps<{
  recipeId: number;
}>();

const { data: recipeFetch } = await useFetch<RecipeDetail>(
  `/api/recipesCategories/recipes/${props.recipeId}`,
  {
    method: 'GET',
    watch: false,
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  },
);

const recipe = recipeFetch.value;
const ingredients = ref(
  recipe?.ingredients.map(ingredient => ({
    name: ingredient.ingredient.name,
    quantity: ingredient.quantity,
    unit: ingredient.unit?.shortForm,
    singlePortion: ingredient.quantity / (recipe.peopleNumber ?? 1),
  })),
);
const sequences = recipe?.sequences.map(sequence => ({
  label: sequence.name,
  content: sequence.extra ?? undefined,
}));
const peopleNumberModified = ref(recipe?.peopleNumber ?? 1);

function renderIngredient(): void {
  if (ingredients.value) {
    for (const [index] of ingredients.value.entries()) {
      if (ingredients.value[index]) {
        ingredients.value[index].quantity = Number(
          (
            ingredients.value[index].singlePortion * peopleNumberModified.value
          ).toFixed(2),
        );
      }
    }
  }
}
</script>

<template>
  <UCard class="w-full card">
    <template #header>
      <!-- <div class="layer"/> -->
      <div class="noImage">
        {{ $t('recipeCardDetails.noImage') }}
      </div>
      <div class="text-center text-4xl m-4 font-bold text-primary [word-break:break-word]">
        {{ recipe?.name }}
      </div>
      <div class="icons flex justify-center items-center gap-4">
        <div class="peopleNumber flex justify-center items-center gap-1 w-20">
          <UIcon name="i-lucide-users" />
          <UInputNumber
            v-model="peopleNumberModified"
            :min="1"
            :max="50"
            size="md"
            variant="none"
            orientation="vertical"
            class="w-15"
            @update:model-value="renderIngredient()"
          />
        </div>
        <div class="preparationTime flex justify-center items-center gap-1 w-20">
          <UIcon name="i-lucide-lab-mortar-pestle" />
          <span class="value">{{ formatDurationUtils(recipe?.preparationTime) }}</span>
        </div>
        <div class="cookingTime flex justify-center items-center gap-1 w-20">
          <UIcon name="i-lucide-microwave" />
          <span class="value">{{ formatDurationUtils(recipe?.cookingTime) }}</span>
        </div>
        <div class="restTime flex justify-center items-center gap-1 w-20">
          <UIcon name="i-streamline-sleep" />
          <span class="value">{{ formatDurationUtils(recipe?.restTime) }}</span>
        </div>
      </div>
      <div
        v-if="recipe?.allergens?.length ?? 0 > 0"
        class="text-center mt-2 flex gap-3 justify-center"
      >
        <UTooltip
          v-for="(allergen, index) in recipe?.allergens"
          :key="index"
          :text="allergen.allergen.name"
        >
          <UIcon
            class="size-5"
            :name="`allergens-icons:${allergen.allergen.icon}`"
          />
        </UTooltip>
      </div>
      <div
        v-else
        class="text-center mt-2"
      >
        <div>
          {{ $t('allergenFree') }}
        </div>
      </div>
    </template>
    <UContainer class="info mb-6">
      <div>{{ recipe?.description }}</div>
      <div class="mt-4 italic text-center opacity-60">
        {{ `❝ ${recipe?.tips} ❞` }}
      </div>
    </UContainer>
    <USeparator />
    <UContainer class="base flex pb-6 pt-6">
      <div class="ingredientsUstensils w-1/4">
        <h1 class="text-3xl mb-4 font-semibold text-primary">
          {{ $t('ingredient', 2) }}
        </h1>
        <div class="flex flex-col">
          <div
            v-for="(ingredient, index) in ingredients"
            :key="index"
          >
            <span class="font-bold">{{ `${ingredient.quantity}${ingredient.unit ?? ''} ` }}</span>
            <span>{{ ingredient.name }}</span>
          </div>
        </div>
        <USeparator class="pb-6 pt-6" />
        <h1 class="text-3xl mb-4 font-semibold text-primary">
          {{ $t('ustensil', 2) }}
        </h1>
        <div class="flex flex-col">
          <div
            v-for="(ustensil, index) in recipe?.ustensils"
            :key="index"
          >
            {{ ustensil.ustensil.name }}
          </div>
        </div>
      </div>
      <USeparator
        class="mr-6 ml-6"
        orientation="vertical"
      />
      <div class="sequences w-3/4 flex flex-col">
        <h1 class="text-3xl mb-4 font-semibold text-primary">
          {{ $t('preparationSteps') }}
        </h1>
        <UAccordion
          type="multiple"
          :items="sequences"
          :default-value="['0']"
          :ui="{ label: '[word-break:break-word]' }"
        >
          <template #leading="{ index }">
            <span class="truncate">{{ index + 1 }}.</span>
          </template>
        </UAccordion>
      </div>
    </UContainer>
    <template #footer>
      <div class="footer flex justify-between items-center">
        <p>{{ $t('createdBy', { username: recipe?.createdBy.displayUsername }) }}</p>
        <p>{{ $d(new Date(recipe?.createdAt ?? ''), 'short') }}</p>
      </div>
    </template>
  </UCard>
</template>

<style lang="scss" scoped>
  .card {
    --tw-ring-color: transparent;
  }

  .layer {
    aspect-ratio: 3 / 1;
    background:
      linear-gradient(180deg, rgba(17,24,39,1) 0%, rgba(17,24,39,0) 20%, rgba(17,24,39,0) 50%, rgba(17,24,39,0) 80%, rgba(17,24,39,1) 100%),
      linear-gradient(90deg, rgba(17,24,39,1) 0%, rgba(17,24,39,0) 20%, rgba(17,24,39,0) 50%, rgba(17,24,39,0) 80%, rgba(17,24,39,1) 100%);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  .noImage {
    aspect-ratio: 3 / 1;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
  }
</style>
