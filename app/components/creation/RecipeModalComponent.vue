<script lang="ts" setup>
import { CreationUstensilModalComponent } from '#components';
import type { FormSubmitEvent } from '#ui/types';
import {
  recipeCreation,

} from '~/schemas/creation/recipe';
import type { RecipeCreation } from '~/schemas/creation/recipe';

const props = defineProps<{
  modalTitle: string;
}>();
const emit = defineEmits(['closeModal']);

const nuxtApp = useNuxtApp();
const isIngredientCreationModalOpen = ref(false);
const ingredientNameToCreate = ref<string | undefined>(undefined);
const selectMenuIngredientIdConcerned = ref(0);
const isRecipeCategoryCreationModalOpen = ref(false);
const recipeCategoryNameToCreate = ref<string | undefined>(undefined);
const isUstensilCreationModalOpen = ref(false);
const ustensilNameToCreate = ref<string | undefined>(undefined);
const toast = useToast();
const form = ref();
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

const { data: seasons } = await useFetch('/api/seasons/all', {
  method: 'GET',
  watch: false,
  default: () => null,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
  transform: (seasons) => {
    return mapSelectMenuItemsUtils(seasons);
  },
});

const {
  data: recipesCategories,
  refresh: refreshRecipesCategoriesFetch,
} = await useFetch(
  '/api/recipesCategories/all',
  {
    method: 'GET',
    watch: false,
    default: () => null,
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
    transform: (recipesCategories) => {
      return mapSelectMenuItemsUtils(recipesCategories);
    },
  },
);

const {
  data: ingredients,
  refresh: refreshIngredientsFetch,
} = await useFetch('/api/ingredients/all', {
  method: 'GET',
  watch: false,
  default: () => null,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
  transform: (ingredients) => {
    return mapSelectMenuItemsUtils(ingredients);
  },
});

const { data: allergens } = await useFetch('/api/allergens/all', {
  method: 'GET',
  watch: false,
  default: () => null,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
  transform: (allergens) => {
    return mapSelectMenuItemsUtils(allergens);
  },
});

const {
  data: ustensils,
  refresh: refreshUstensilsFetch,
} = await useFetch('/api/ustensils/all', {
  method: 'GET',
  watch: false,
  default: () => null,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
  transform: (ustensils) => {
    return mapSelectMenuItemsUtils(ustensils);
  },
});

const { data: units } = await useFetch('/api/units/all', {
  method: 'GET',
  watch: false,
  default: () => null,
  onResponseError({ response }) {
    throw showError({
      statusCode: response.status,
      statusMessage: response.statusText,
    });
  },
  transform: (units) => {
    return mapSelectMenuItemsUtils(units);
  },
});

async function onSubmit(event: FormSubmitEvent<RecipeCreation>) {
  await $fetch('/api/recipesCategories/recipes', {
    method: 'POST',
    body: event.data,
    immediate: false,
    watch: false,
    async onResponse() {
      await nuxtApp.callHook('recipe:created', {});
      emit('closeModal');
      toast.add({
        title: `La recette ${event.data.name} a bien été ajouté !`,
      });
    },
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response._data.message,
      });
    },
  });
}

nuxtApp.hook('ingredient:created', async (payload) => {
  await refreshIngredientsFetch();
  ingredientNameToCreate.value = undefined;
  if (state.value.ingredients[selectMenuIngredientIdConcerned.value]) {
    // @ts-expect-error : I checked if this isn't null or undefined...
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
</script>

<template>
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
      <div class="flex flex-col gap-4">
        <UFormField
          :label="$t('formCreation.name')"
          name="name"
          eager-validation
          :ui="{ container: 'w-container' }"
        >
          <UInput
            v-model="state.name"
            type="text"
            :placeholder="$t('formCreation.recipe.nameExample')"
          />
        </UFormField>
        <UFormField
          :label="$t('formCreation.recipe.description')"
          name="description"
          eager-validation
          :ui="{ container: 'w-container' }"
        >
          <UTextarea
            v-model="state.description"
            :placeholder="$t('formCreation.recipe.descriptionExample')"
          />
        </UFormField>
        <UFormField
          :label="$t('formCreation.recipe.tips')"
          name="tips"
          :hint="$t('formCreation.recipe.optional')"
          eager-validation
          :ui="{ container: 'w-container' }"
        >
          <UInput
            v-model="state.tips"
            type="text"
            :placeholder="$t('formCreation.recipe.tipsExample')"
          />
        </UFormField>
        <div class="flex gap-2 flex-wrap justify-between">
          <UFormField
            :label="$t('formCreation.recipe.peopleNumber')"
            name="peopleNumber"
            eager-validation
            :ui="{ root: 'w-auto grow', container: 'w-container' }"
          >
            <UInput
              v-model="state.peopleNumber"
              type="number"
              placeholder="4"
            />
          </UFormField>
          <UFormField
            :label="$t('formCreation.recipe.preparationTime')"
            name="preparationTime"
            :hint="$t('formCreation.recipe.timeHint')"
            eager-validation
            :ui="{ root: 'w-auto grow', container: 'w-container' }"
          >
            <UInput
              v-model="state.preparationTime"
              type="number"
              placeholder="25"
            />
          </UFormField>
          <UFormField
            :label="$t('formCreation.recipe.cookingTime')"
            name="cookingTime"
            :hint="$t('formCreation.recipe.timeHint')"
            eager-validation
            :ui="{ root: 'w-auto grow', container: 'w-container' }"
          >
            <UInput
              v-model="state.cookingTime"
              type="number"
              placeholder="122"
            />
          </UFormField>
          <UFormField
            :label="$t('formCreation.recipe.restTime')"
            name="restTime"
            :hint="$t('formCreation.recipe.timeHint')"
            eager-validation
            :ui="{ root: 'w-auto grow', container: 'w-container' }"
          >
            <UInput
              v-model="state.restTime"
              type="number"
              placeholder="0"
            />
          </UFormField>
        </div>

        <USeparator />

        <!-- ------------ Ingredients ------------ -->

        <UFormField
          :label="$t('ingredient')"
          name="ingredients"
          class="flex flex-col gap-4"
          size="xl"
          :ui="{ container: 'flex flex-col gap-4' }"
        >
          <template #hint>
            <UButton
              icon="i-lucide-plus"
              variant="ghost"
              @click="state.ingredients?.push({ ingredientId: 0, quantity: 0 })"
            >
              {{ $t('add') }}
            </UButton>
          </template>
          <div
            v-for="(ingredient, index) of state.ingredients"
            :key="ingredient.ingredientId"
            class="flex gap-2 w-full flex-wrap"
          >
            <UFormField
              :label="$t('formCreation.recipe.name')"
              :name="`ingredients.${index}.ingredientId`"
              :ui="{ root: 'w-auto grow', container: 'w-container' }"
            >
              <USelectMenu
                v-model="ingredient.ingredientId"
                value-key="id"
                :items="ingredients ?? []"
                create-item
                :searchable-placeholder="$t('search')"
                :placeholder="$t('formCreation.recipe.selectBy_male', { selectName: $t('ingredient').toLowerCase() })"
                :ui="{ base: 'w-full' }"
                @create="(name) => { ingredientNameToCreate = name; selectMenuIngredientIdConcerned = index; isIngredientCreationModalOpen = true }"
              />
            </UFormField>
            <UFormField
              :label="$t('formCreation.recipe.quantity')"
              :name="`ingredients.${index}.quantity`"
              eager-validation
              :ui="{ root: 'w-auto grow', container: 'w-container' }"
            >
              <UInput
                v-model="ingredient.quantity"
                type="number"
                placeholder="2.6"
                class="w-min"
              />
            </UFormField>
            <UFormField
              :label="$t('formCreation.recipe.unit')"
              :name="`ingredients.${index}.unitId`"
              :ui="{ root: 'w-auto grow', container: 'w-container' }"
              :hint="$t('formCreation.recipe.optional')"
            >
              <USelectMenu
                v-model="ingredient.unitId"
                value-key="id"
                :items="units ?? []"
                :searchable-placeholder="$t('search')"
                :placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.unit').toLowerCase() })"
                :ui="{ base: 'w-full' }"
              />
            </UFormField>
            <UButton
              :disabled="!((state.ingredients?.length ?? 0) > 1 && index > 0)"
              class="w-fit h-fit align-middle"
              icon="i-lucide-minus"
              variant="ghost"
              @click="state.ingredients?.splice(index, 1)"
            >
              {{ $t('delete') }}
            </UButton>
          </div>
        </UFormField>

        <USeparator />
        <!-- ------------ Sequence ------------ -->

        <UFormField
          :label="$t('formCreation.recipe.sequences')"
          name="sequences"
          class="flex flex-col gap-4"
          size="xl"
        >
          <template #hint>
            <UButton
              icon="i-lucide-plus"
              variant="ghost"
              @click="state.sequences?.push({ name: '', extra: '' })"
            >
              {{ $t('add') }}
            </UButton>
          </template>
          <div class="flex flex-col gap-4 w-full">
            <div
              v-for="(sequence, index) in state.sequences"
              :key="index"
              class="flex gap-4 w-full"
            >
              <UFormField
                :label="$t('formCreation.recipe.sequenceDescription')"
                :name="`sequences.${index}.name`"
                eager-validation
                :ui="{ root: 'w-root', container: 'w-container' }"
              >
                <UInput
                  v-model="sequence.name"
                  type="string"
                  :placeholder="$t('formCreation.recipe.sequenceDescriptionExample')"
                />
              </UFormField>
              <UFormField
                :label="$t('formCreation.recipe.sequenceExtra')"
                :name="`sequences.${index}.extra`"
                eager-validation
                :ui="{ root: 'w-root', container: 'w-container' }"
                :hint="$t('formCreation.recipe.optional')"
              >
                <UInput
                  v-model="sequence.extra"
                  type="string"
                  :placeholder="$t('formCreation.recipe.sequenceExtraExample')"
                />
              </UFormField>
              <UButton
                :disabled="!((state.sequences?.length ?? 0) > 1 && index > 0)"
                class="w-fit h-fit self-center"
                icon="i-lucide-minus"
                variant="ghost"
                @click="state.sequences?.splice(index, 1)"
              >
                {{ $t('delete') }}
              </UButton>
            </div>
          </div>
        </UFormField>

        <USeparator />

        <!-- ------------ Ustensils, Categories, allergens ------------ -->

        <div class="flex gap-2 flex-wrap">
          <UFormField
            :label="$t('ustensil', 2)"
            name="ustensils"
            :ui="{ root: 'w-fit grow', container: 'w-container' }"
          >
            <USelectMenu
              v-model="state.ustensils"
              value-key="id"
              :items="ustensils ?? []"
              multiple
              create-item
              :searchable-placeholder="$t('search')"
              class="w-full"
              :placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('ustensil', 2).toLowerCase() })"
              @create="(name) => { ustensilNameToCreate = name; isUstensilCreationModalOpen = true }"
            />
          </UFormField>
          <UFormField
            :label="$t('category')"
            name="recipesCategoryId"
            :ui="{ root: 'w-fit grow', container: 'w-container' }"
          >
            <USelectMenu
              v-model="state.recipesCategoryId"
              value-key="id"
              :items="recipesCategories ?? []"
              :searchable-placeholder="$t('search')"
              create-item
              class="w-full"
              :placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.category').toLowerCase() })"
              @create="(name) => { recipeCategoryNameToCreate = name; isRecipeCategoryCreationModalOpen = true }"
            />
          </UFormField>
          <UFormField
            :label="$t('formCreation.recipe.season')"
            name="seasonId"
            :ui="{ root: 'w-fit grow', container: 'w-container' }"
          >
            <USelectMenu
              v-model="state.seasonId"
              value-key="id"
              :items="seasons ?? []"
              :placeholder="$t('formCreation.recipe.selectBy_female', { selectName: $t('formCreation.recipe.season').toLowerCase() })"
              class="w-full"
            />
          </UFormField>
        </div>
        <UFormField
          :label="$t('allergens')"
          name="allergens"
          :hint="$t('formCreation.recipe.optional')"
        >
          <USelectMenu
            v-model="state.allergens"
            value-key="id"
            :items="allergens ?? []"
            multiple
            :searchable-placeholder="$t('search')"
            class="w-full"
            :placeholder="$t('formCreation.recipe.selectBy_plural', { selectName: $t('allergens').toLowerCase() })"
          />
        </UFormField>
      </div>
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
          >
            {{ $t('formCreation.submit') }}
          </UButton>
        </div>
      </template>
    </UCard>
  </UForm>
</template>

<style lang="scss" scoped>
  .w-container div {
    width: 100%;
  }

  .w-root {
    width: 100%;
  }
</style>
