<script lang="ts" setup>
import type { FormSubmitEvent } from '#ui/types';
import { recipeCreation } from '~/schemas/creation/recipe';
import type { RecipeCreation } from '~/schemas/creation/recipe';

const props = defineProps<{
  recipeId: number;
}>();

const emit = defineEmits<{
  close: [success: boolean];
}>();

const { t } = useI18n();
const form = ref();
const nuxtApp = useNuxtApp();
const toast = useToast();
const { start, finish } = useLoadingIndicator();
const schema = recipeCreation;
const disabledSubmit = ref(false);

// States for creation modals
const isIngredientCreationModalOpen = ref(false);
const ingredientNameToCreate = ref<string | undefined>(undefined);
const selectMenuIngredientIdConcerned = ref(0);
const isRecipeCategoryCreationModalOpen = ref(false);
const recipeCategoryNameToCreate = ref<string | undefined>(undefined);
const isUstensilCreationModalOpen = ref(false);
const ustensilNameToCreate = ref<string | undefined>(undefined);

const { data: recipe, error } = await useRecipesRequest().getById(props.recipeId, { watch: false });

if (error.value || !recipe.value) {
  emit('close', false);
}

const { data: seasonsRaw } = await useSeasonsRequest().getAllCached({
  watch: false,
  default: () => [],
});
const seasons = computed(() => mapSelectMenuItemsUtils(seasonsRaw.value));

const { data: recipesCategoriesRaw, refresh: refreshRecipesCategoriesFetch } = await useRecipesCategoriesRequest().getAllCached({
  watch: false,
  default: () => [],
});
const recipesCategories = computed(() => mapSelectMenuItemsUtils(recipesCategoriesRaw.value));

const { data: ingredientsRaw, refresh: refreshIngredientsFetch } = await useIngredientsRequest().getAllCached({
  watch: false,
  default: () => [],
});
const ingredients = computed(() => mapSelectMenuItemsUtils(ingredientsRaw.value));

const { data: allergensRaw } = await useAllergensRequest().getAllCached({
  watch: false,
  default: () => [],
});
const allergens = computed(() => mapSelectMenuItemsUtils(allergensRaw.value));

const { data: ustensilsRaw, refresh: refreshUstensilsFetch } = await useUstensilsRequest().getAllCached({
  watch: false,
  default: () => [],
});
const ustensils = computed(() => mapSelectMenuItemsUtils(ustensilsRaw.value));

const { data: unitsRaw } = await useUnitsRequest().getAllCached({
  watch: false,
  default: () => [],
});
const units = computed(() => mapSelectMenuItemsUtils(unitsRaw.value));

// Initialize form state with fetched data
const state = ref<RecipeCreation>({
  name: recipe.value?.name || '',
  description: recipe.value?.description || '',
  tips: recipe.value?.tips,
  peopleNumber: recipe.value?.peopleNumber || 1,
  preparationTime: recipe.value?.preparationTime || 0,
  cookingTime: recipe.value?.cookingTime || 0,
  restTime: recipe.value?.restTime || 0,
  seasonId: recipe.value?.seasonId || 1,
  ingredients: recipe.value?.ingredients?.length
    ? recipe.value.ingredients.map((ing: any) => ({
        ingredientId: ing.ingredientId,
        quantity: ing.quantity,
        unitId: ing.unitId,
      }))
    : [{ ingredientId: 1, quantity: 0 }],
  sequences: recipe.value?.sequences?.length
    ? recipe.value.sequences
    : [{ name: '', extra: undefined }],
  allergens: recipe.value?.allergens?.map((a: any) => a.id) || [],
  ustensils: recipe.value?.ustensils?.map((u: any) => u.id) || [1],
  recipesCategoryId: recipe.value?.recipesCategoryId || 1,
});

async function onSubmit(event: FormSubmitEvent<RecipeCreation>) {
  disabledSubmit.value = true;
  start();
  try {
    await useRecipesRequest().update(props.recipeId, event.data, { onResponse: async () => {
      await nuxtApp.callHook('recipe:updated', {
        id: props.recipeId,
      });
      toast.add({
        title: t('formEdition.recipe.updatedToast', { recipeName: event.data.name }),
      });
      emit('close', true);
    } });
  }
  finally {
    disabledSubmit.value = false;
    finish();
  }
}

function handleClose() {
  emit('close', false);
}

// Handlers for creating new items
function handleCreateIngredient(name: string, index: number) {
  ingredientNameToCreate.value = name;
  selectMenuIngredientIdConcerned.value = index;
  isIngredientCreationModalOpen.value = true;
}

function handleCreateRecipeCategory(name: string) {
  recipeCategoryNameToCreate.value = name;
  isRecipeCategoryCreationModalOpen.value = true;
}

function handleCreateUstensil(name: string) {
  ustensilNameToCreate.value = name;
  isUstensilCreationModalOpen.value = true;
}

// Hooks for created items
nuxtApp.hook('ingredient:created', async (payload) => {
  await refreshIngredientsFetch();
  ingredientNameToCreate.value = undefined;
  const ingredient = state.value.ingredients[selectMenuIngredientIdConcerned.value];
  if (ingredient) {
    ingredient.ingredientId = payload.id;
  }
});

nuxtApp.hook('recipesCategory:created', async (payload) => {
  await refreshRecipesCategoriesFetch();
  recipeCategoryNameToCreate.value = undefined;
  state.value.recipesCategoryId = payload.id;
});

nuxtApp.hook('ustensil:created', async (payload) => {
  await refreshUstensilsFetch();
  ustensilNameToCreate.value = undefined;
  if (state.value.ustensils) {
    state.value.ustensils.push(payload.id);
  }
});
</script>

<template>
  <UModal
    :title="t('formEdition.recipe.cardTitle')"
    :close="{ onClick: handleClose }"
    prevent-close
    class="max-w-6xl max-h-[90vh]"
  >
    <template #body>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        class="max-h-full"
        @submit="onSubmit"
      >
        <FormRecipeFields
          v-model="state"
          :seasons="seasons"
          :recipes-categories="recipesCategories"
          :ingredients="ingredients"
          :allergens="allergens"
          :ustensils="ustensils"
          :units="units"
          :disabled="disabledSubmit"
          @create-ingredient="handleCreateIngredient"
          @create-recipe-category="handleCreateRecipeCategory"
          @create-ustensil="handleCreateUstensil"
        />
      </UForm>
    </template>
    <template #footer>
      <div class="flex justify-between w-full">
        <UButton
          variant="outline"
          @click="handleClose"
        >
          {{ t('formEdition.cancel') }}
        </UButton>
        <UButton
          :disabled="disabledSubmit"
          @click="form?.submit()"
        >
          {{ t('formEdition.save') }}
        </UButton>
      </div>
    </template>

    <!-- Creation modals -->
    <UModal
      v-model:open="isUstensilCreationModalOpen"
      :dismissible="false"
      class="max-h-10/12 max-w-4xl"
    >
      <template #content>
        <CreationUstensilModalComponent
          modal-title="ustensil"
          :ustensil-name="ustensilNameToCreate"
          @close-modal="isUstensilCreationModalOpen = false"
        />
      </template>
    </UModal>
    <UModal
      v-model:open="isIngredientCreationModalOpen"
      :dismissible="false"
      class="max-h-10/12 max-w-4xl"
    >
      <template #content>
        <CreationIngredientModalComponent
          modal-title="ingredient"
          :ingredient-name="ingredientNameToCreate"
          @close-modal="isIngredientCreationModalOpen = false"
        />
      </template>
    </UModal>
    <UModal
      v-model:open="isRecipeCategoryCreationModalOpen"
      :dismissible="false"
      class="max-h-10/12 max-w-4xl"
    >
      <template #content>
        <CreationRecipesCategoryModalComponent
          modal-title="category"
          :recipe-category-name="recipeCategoryNameToCreate"
          @close-modal="isRecipeCategoryCreationModalOpen = false"
        />
      </template>
    </UModal>
  </UModal>
</template>
