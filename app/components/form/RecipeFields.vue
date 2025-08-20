<script lang="ts" setup>
import type { SelectMenuItem } from '@nuxt/ui';

interface RecipeFormData {
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
}

interface Props {
  modelValue: RecipeFormData;
  seasons: SelectMenuItem[];
  recipesCategories: SelectMenuItem[];
  ingredients: SelectMenuItem[];
  allergens: SelectMenuItem[];
  ustensils: SelectMenuItem[];
  units: SelectMenuItem[];
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: RecipeFormData];
  'createIngredient': [name: string, index: number];
  'createRecipeCategory': [name: string];
  'createUstensil': [name: string];
}>();

const { t } = useI18n();

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function updateField<K extends keyof RecipeFormData>(field: K, value: RecipeFormData[K]) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
}

function addIngredient() {
  const newIngredients = [...(props.modelValue.ingredients || [])];
  newIngredients.push({ ingredientId: 0, quantity: 0 });
  updateField('ingredients', newIngredients);
}

function removeIngredient(index: number) {
  const newIngredients = [...(props.modelValue.ingredients || [])];
  newIngredients.splice(index, 1);
  updateField('ingredients', newIngredients);
}

function updateIngredient(index: number, field: string, value: any) {
  const newIngredients = [...(props.modelValue.ingredients || [])];
  newIngredients[index] = { ...newIngredients[index], [field]: value };
  updateField('ingredients', newIngredients);
}

function addSequence() {
  const newSequences = [...(props.modelValue.sequences || [])];
  newSequences.push({ name: undefined, extra: undefined });
  updateField('sequences', newSequences);
}

function removeSequence(index: number) {
  const newSequences = [...(props.modelValue.sequences || [])];
  newSequences.splice(index, 1);
  updateField('sequences', newSequences);
}

function updateSequence(index: number, field: string, value: any) {
  const newSequences = [...(props.modelValue.sequences || [])];
  newSequences[index] = { ...newSequences[index], [field]: value };
  updateField('sequences', newSequences);
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <UFormField
      :label="t('formCreation.name')"
      name="name"
      eager-validation
      :ui="{ container: 'w-container' }"
    >
      <UInput
        :model-value="localValue.name"
        type="text"
        :placeholder="t('formCreation.recipe.nameExample')"
        :disabled="disabled"
        @update:model-value="updateField('name', $event)"
      />
    </UFormField>

    <UFormField
      :label="t('formCreation.recipe.description')"
      name="description"
      eager-validation
      :ui="{ container: 'w-container' }"
    >
      <UTextarea
        :model-value="localValue.description"
        :placeholder="t('formCreation.recipe.descriptionExample')"
        :disabled="disabled"
        @update:model-value="updateField('description', $event)"
      />
    </UFormField>

    <UFormField
      :label="t('formCreation.recipe.tips')"
      name="tips"
      :hint="t('formCreation.recipe.optional')"
      eager-validation
      :ui="{ container: 'w-container' }"
    >
      <UInput
        :model-value="localValue.tips"
        type="text"
        :placeholder="t('formCreation.recipe.tipsExample')"
        :disabled="disabled"
        @update:model-value="updateField('tips', $event)"
      />
    </UFormField>

    <div class="flex gap-2 flex-wrap justify-between">
      <UFormField
        :label="t('formCreation.recipe.peopleNumber')"
        name="peopleNumber"
        eager-validation
        :ui="{ root: 'w-auto grow', container: 'w-container' }"
      >
        <UInput
          :model-value="localValue.peopleNumber"
          type="number"
          placeholder="4"
          :disabled="disabled"
          @update:model-value="updateField('peopleNumber', Number($event))"
        />
      </UFormField>

      <UFormField
        :label="t('formCreation.recipe.preparationTime')"
        name="preparationTime"
        :hint="t('formCreation.recipe.timeHint')"
        eager-validation
        :ui="{ root: 'w-auto grow', container: 'w-container' }"
      >
        <UInput
          :model-value="localValue.preparationTime"
          type="number"
          placeholder="25"
          :disabled="disabled"
          @update:model-value="updateField('preparationTime', Number($event))"
        />
      </UFormField>

      <UFormField
        :label="t('formCreation.recipe.cookingTime')"
        name="cookingTime"
        :hint="t('formCreation.recipe.timeHint')"
        eager-validation
        :ui="{ root: 'w-auto grow', container: 'w-container' }"
      >
        <UInput
          :model-value="localValue.cookingTime"
          type="number"
          placeholder="122"
          :disabled="disabled"
          @update:model-value="updateField('cookingTime', Number($event))"
        />
      </UFormField>

      <UFormField
        :label="t('formCreation.recipe.restTime')"
        name="restTime"
        :hint="t('formCreation.recipe.timeHint')"
        eager-validation
        :ui="{ root: 'w-auto grow', container: 'w-container' }"
      >
        <UInput
          :model-value="localValue.restTime"
          type="number"
          placeholder="0"
          :disabled="disabled"
          @update:model-value="updateField('restTime', Number($event))"
        />
      </UFormField>
    </div>

    <USeparator />

    <!-- Ingredients -->
    <UFormField
      :label="t('ingredient')"
      name="ingredients"
      class="flex flex-col gap-4"
      size="xl"
      :ui="{ container: 'flex flex-col gap-4' }"
    >
      <template #hint>
        <UButton
          icon="i-lucide-plus"
          variant="ghost"
          :disabled="disabled"
          @click="addIngredient"
        >
          {{ t('add') }}
        </UButton>
      </template>
      <div
        v-for="(ingredient, index) of localValue.ingredients"
        :key="index"
        class="flex gap-2 w-full flex-wrap"
      >
        <UFormField
          :label="t('formCreation.recipe.name')"
          :name="`ingredients.${index}.ingredientId`"
          :ui="{ root: 'w-auto grow', container: 'w-container' }"
        >
          <USelectMenu
            :model-value="ingredient.ingredientId"
            value-key="id"
            :items="ingredients"
            :create-item="!disabled"
            option-attribute="name"
            value-attribute="id"
            :placeholder="t('formCreation.recipe.selectByIngredientId')"
            :disabled="disabled"
            @update:model-value="updateIngredient(index, 'ingredientId', Number($event))"
            @create-item="emit('createIngredient', $event, index)"
          />
        </UFormField>
        <UFormField
          :label="t('formCreation.recipe.quantity')"
          :name="`ingredients.${index}.quantity`"
          :ui="{ root: 'w-auto grow', container: 'w-container' }"
        >
          <UInput
            :model-value="ingredient.quantity"
            type="number"
            :placeholder="t('formCreation.recipe.quantityExample')"
            :disabled="disabled"
            @update:model-value="updateIngredient(index, 'quantity', Number($event))"
          />
        </UFormField>
        <UFormField
          :label="t('formCreation.recipe.unit')"
          :name="`ingredients.${index}.unitId`"
          :ui="{ root: 'w-auto grow', container: 'w-container' }"
        >
          <USelectMenu
            :model-value="ingredient.unitId"
            value-key="id"
            :items="units"
            option-attribute="name"
            value-attribute="id"
            :placeholder="t('formCreation.recipe.selectByUnitId')"
            :disabled="disabled"
            @update:model-value="updateIngredient(index, 'unitId', Number($event))"
          />
        </UFormField>
        <UButton
          v-if="localValue.ingredients.length > 1"
          :label="t('remove')"
          variant="ghost"
          icon="i-lucide-trash-2"
          :disabled="disabled"
          @click="removeIngredient(index)"
        />
      </div>
    </UFormField>

    <USeparator />

    <!-- Sequences -->
    <UFormField
      :label="t('formCreation.recipe.sequences')"
      name="sequences"
      class="flex flex-col gap-4"
      :ui="{ container: 'flex flex-col gap-4' }"
    >
      <template #hint>
        <UButton
          icon="i-lucide-plus"
          variant="ghost"
          :disabled="disabled"
          @click="addSequence"
        >
          {{ t('add') }}
        </UButton>
      </template>
      <div
        v-for="(sequence, index) of localValue.sequences"
        :key="index"
        class="flex gap-2 w-full flex-wrap"
      >
        <UFormField
          :label="`${t('formCreation.recipe.step')} ${index + 1}`"
          :name="`sequences.${index}.name`"
          :ui="{ root: 'w-auto grow', container: 'w-container' }"
        >
          <UTextarea
            :model-value="sequence.name"
            :placeholder="t('formCreation.recipe.sequenceNameExample')"
            :disabled="disabled"
            @update:model-value="updateSequence(index, 'name', $event)"
          />
        </UFormField>
        <UButton
          v-if="localValue.sequences.length > 1"
          :label="t('remove')"
          variant="ghost"
          icon="i-lucide-trash-2"
          :disabled="disabled"
          @click="removeSequence(index)"
        />
      </div>
    </UFormField>

    <USeparator />

    <!-- Other fields -->
    <UFormField
      :label="t('formCreation.recipe.season')"
      name="seasonId"
      :hint="t('formCreation.recipe.optional')"
    >
      <USelectMenu
        :model-value="localValue.seasonId"
        value-key="id"
        :items="seasons"
        :placeholder="t('formCreation.recipe.selectBySeasonId')"
        option-attribute="name"
        value-attribute="id"
        :disabled="disabled"
        @update:model-value="updateField('seasonId', Number($event))"
      />
    </UFormField>

    <UFormField
      :label="t('formCreation.recipe.recipesCategory')"
      name="recipesCategoryId"
    >
      <USelectMenu
        :model-value="localValue.recipesCategoryId"
        value-key="id"
        :items="recipesCategories"
        :create-item="!disabled"
        :placeholder="t('formCreation.recipe.selectByRecipesCategoryId')"
        option-attribute="name"
        value-attribute="id"
        :disabled="disabled"
        @update:model-value="updateField('recipesCategoryId', Number($event))"
        @create-item="emit('createRecipeCategory', $event)"
      />
    </UFormField>

    <UFormField
      :label="t('formCreation.recipe.allergens')"
      name="allergens"
      :hint="t('formCreation.recipe.optional')"
    >
      <USelectMenu
        :model-value="localValue.allergens"
        value-key="id"
        :items="allergens"
        multiple
        :placeholder="t('formCreation.recipe.selectByAllergensId')"
        option-attribute="name"
        value-attribute="id"
        :disabled="disabled"
        @update:model-value="updateField('allergens', $event)"
      />
    </UFormField>

    <UFormField
      :label="t('formCreation.recipe.ustensils')"
      name="ustensils"
      :hint="t('formCreation.recipe.optional')"
    >
      <USelectMenu
        :model-value="localValue.ustensils"
        value-key="id"
        :items="ustensils"
        multiple
        :create-item="!disabled"
        :placeholder="t('formCreation.recipe.selectByUstensilsId')"
        option-attribute="name"
        value-attribute="id"
        :disabled="disabled"
        @update:model-value="updateField('ustensils', $event)"
        @create-item="emit('createUstensil', $event)"
      />
    </UFormField>
  </div>
</template>
