<script lang="ts" setup>
import type { FormSubmitEvent, SelectMenuItem } from '#ui/types';
import {
  recipeCreation,

} from '~/schemas/creation/recipe';
import type { RecipeCreation } from '~/schemas/creation/recipe';
import type { Allergen, Ingredient, RecipesCategory, Season, Unit, Ustensil } from '~~/server/utils/drizzleUtils';

const props = defineProps<{
  modalTitle: string;
}>();
const emit = defineEmits(['closeModal']);

const toast = useToast();
const { start, finish } = useLoadingIndicator();
const { t } = useI18n();
const nuxtApp = useNuxtApp();
const isIngredientCreationModalOpen = ref(false);
const ingredientNameToCreate = ref<string | undefined>(undefined);
const selectMenuIngredientIdConcerned = ref(0);
const isRecipeCategoryCreationModalOpen = ref(false);
const recipeCategoryNameToCreate = ref<string | undefined>(undefined);
const isUstensilCreationModalOpen = ref(false);
const ustensilNameToCreate = ref<string | undefined>(undefined);
const form = ref();
const disabledSubmit = ref(false);
const state = ref<{
  name?: string;
  description?: string;
  tips?: string;
  peopleNumber?: number;
  preparationTime?: number;
  cookingTime?: number;
  restTime?: number;
  seasonId?: number;
  ingredients: { ingredientId?: number; quantity?: number; unitId?: number }[];
  sequences: { name?: string; extra?: string }[];
  allergens?: number[];
  ustensils?: number[];
  recipesCategoryId?: number;
}>({
  name: undefined,
  description: undefined,
  tips: undefined,
  peopleNumber: undefined,
  preparationTime: undefined,
  cookingTime: undefined,
  restTime: undefined,
  seasonId: undefined,
  ingredients: [{ quantity: 0 }],
  sequences: [{ name: undefined, extra: undefined }],
  allergens: [],
  ustensils: undefined,
  recipesCategoryId: undefined,
});

const { data: seasons } = await useSeasonsRequest().getAll<SelectMenuItem[], null>({
  watch: false,
  default: () => null,
  transform: (seasons: Season[]) => mapSelectMenuItemsUtils(seasons),
});

const { data: recipesCategories, refresh: refreshRecipesCategoriesFetch } = await useRecipesCategoriesRequest().getAll<SelectMenuItem[], null>({
  watch: false,
  default: () => null,
  transform: (recipesCategories: RecipesCategory[]) => mapSelectMenuItemsUtils(recipesCategories),
});

const { data: ingredients, refresh: refreshIngredientsFetch } = await useIngredientsRequest().getAll<SelectMenuItem[], null>({
  watch: false,
  default: () => null,
  transform: (ingredients: Ingredient[]) => mapSelectMenuItemsUtils(ingredients),
});

const { data: allergens } = await useAllergensRequest().getAll<SelectMenuItem[], null>({
  watch: false,
  default: () => null,
  transform: (allergens: Allergen[]) => mapSelectMenuItemsUtils(allergens),
});

const { data: ustensils, refresh: refreshUstensilsFetch } = await useUstensilsRequest().getAll<SelectMenuItem[], null>({
  watch: false,
  default: () => null,
  transform: (ustensils: Ustensil[]) => mapSelectMenuItemsUtils(ustensils),
});

const { data: units } = await useUnitsRequest().getAll<SelectMenuItem[], null>({
  watch: false,
  default: () => null,
  transform: (units: Unit[]) => mapSelectMenuItemsUtils(units),
});

async function onSubmit(event: FormSubmitEvent<RecipeCreation>) {
  disabledSubmit.value = true;
  start();
  try {
    await useRecipesRequest().create(event.data, { onResponse: async () => {
      await nuxtApp.callHook('recipe:created', {});
      emit('closeModal');
      toast.add({
        title: t('formCreation.recipe.createdToast', { recipeName: event.data.name }),
      });
    } });
  }
  finally {
    disabledSubmit.value = false;
    finish();
  }
}

nuxtApp.hook('ingredient:created', async (payload) => {
  await refreshIngredientsFetch();
  ingredientNameToCreate.value = undefined;
  if (state.value.ingredients[selectMenuIngredientIdConcerned.value]) {
    // @ts-expect-error : I check if this isn't null or undefined...
    state.value.ingredients[selectMenuIngredientIdConcerned.value].ingredientId = payload.id;
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
</script>

<template>
  <UForm
    ref="form"
    :schema="recipeCreation"
    :state="state"
    class="max-h-full"
    @submit="onSubmit"
  >
    <UCard :ui="{ root: 'max-h-full flex flex-col', body: 'overflow-auto grow' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-neutral-900 dark:text-white">
            {{ $t(`formCreation.${props.modalTitle}.cardTitle`) }}
          </h3>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            class="-my-1"
            @click="emit('closeModal')"
          />
        </div>
      </template>
      <FormRecipeFields
        v-model="state"
        :seasons="seasons ?? []"
        :recipes-categories="recipesCategories ?? []"
        :ingredients="ingredients ?? []"
        :allergens="allergens ?? []"
        :ustensils="ustensils ?? []"
        :units="units ?? []"
        :disabled="disabledSubmit"
        @create-ingredient="handleCreateIngredient"
        @create-recipe-category="handleCreateRecipeCategory"
        @create-ustensil="handleCreateUstensil"
      />
      <template #footer>
        <div class="flex justify-between">
          <UButton
            variant="outline"
            @click="form.clear()"
          >
            {{ $t('formCreation.clear') }}
          </UButton>
          <UButton
            type="submit"
            :disabled="disabledSubmit"
          >
            {{ $t('formCreation.submit') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>

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
</template>

<style lang="scss" scoped>

</style>
