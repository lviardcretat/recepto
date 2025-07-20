<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import {
  FilterIconsGridStatesType,
  FilterSelectMenuStatesType,
} from '~/enums/filter';
import type { CustomAccordionItem } from '~/types/filter';

defineProps<{
  collapsed?: boolean;
}>();

const { t } = useI18n();
const nuxtApp = useNuxtApp();
// const swicthStates = useFilterSwitchStates();
const selectMenuStates = useFilterSelectMenuStates();
const iconsGridStates = useFilterIconsGridStates();

await callOnce(async () => {
  const ustensilsFetch = await $fetch('/api/ustensils/all', {
    method: 'GET',
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  });
  const ingredientsFetch = await $fetch('/api/ingredients/all', {
    method: 'GET',
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  });
  const mealTypesFetch = await $fetch('/api/mealTypes/all', {
    method: 'GET',
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  });
  const dishTypesFetch = await $fetch('/api/dishTypes/all', {
    method: 'GET',
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  });
  const allergensFetch = await $fetch('/api/allergens/all', {
    method: 'GET',
    onResponseError({ response }) {
      throw showError({
        statusCode: response.status,
        statusMessage: response.statusText,
      });
    },
  });

  selectMenuStates.value.ustensils = FilterSelectMenuUtils.mapFilterSelectMenuItems(
    ustensilsFetch,
    selectMenuStates.value[FilterSelectMenuStatesType.USTENSIL],
    FilterSelectMenuStatesType.USTENSIL,
  );
  selectMenuStates.value.ingredients = FilterSelectMenuUtils.mapFilterSelectMenuItems(
    ingredientsFetch,
    selectMenuStates.value[FilterSelectMenuStatesType.INGREDIENT],
    FilterSelectMenuStatesType.INGREDIENT,
  );
  selectMenuStates.value.mealTypes = FilterSelectMenuUtils.mapFilterSelectMenuItems(
    mealTypesFetch,
    selectMenuStates.value[FilterSelectMenuStatesType.MEAL_TYPE],
    FilterSelectMenuStatesType.MEAL_TYPE,
  );
  selectMenuStates.value.dishTypes = FilterSelectMenuUtils.mapFilterSelectMenuItems(
    dishTypesFetch,
    selectMenuStates.value[FilterSelectMenuStatesType.DISH_TYPE],
    FilterSelectMenuStatesType.DISH_TYPE,
  );
  iconsGridStates.value.allergens = FilterIconsGridUtils.mapIconsGridItems(
    allergensFetch,
    iconsGridStates.value[FilterIconsGridStatesType.ALLERGEN],
    FilterIconsGridStatesType.ALLERGEN,
  );
});

nuxtApp.hook('ustensil:created', async () => {
  const ustensilsFetch = await $fetch('/api/ustensils/all', {
    method: 'GET',
  });
  selectMenuStates.value.ustensils = FilterSelectMenuUtils.mapFilterSelectMenuItems(
    ustensilsFetch,
    selectMenuStates.value[FilterSelectMenuStatesType.USTENSIL],
    FilterSelectMenuStatesType.USTENSIL,
  );
});

nuxtApp.hook('ingredient:created', async () => {
  const ingredientsFetch = await $fetch('/api/ingredients/all', {
    method: 'GET',
  });
  selectMenuStates.value.ingredients = FilterSelectMenuUtils.mapFilterSelectMenuItems(
    ingredientsFetch,
    selectMenuStates.value[FilterSelectMenuStatesType.INGREDIENT],
    FilterSelectMenuStatesType.INGREDIENT,
  );
});

const items = computed<(NavigationMenuItem & CustomAccordionItem)[]>(
  () =>
    [
      {
        label: t('filter'),
        type: 'label',
      },
      /* {
        label: t('seasonalRecipes'),
        icon: 'i-lucide-sun-snow',
        slot: 'switch',
        disabled: false,
      }, */
      {
        label: t('ingredient'),
        icon: 'i-lucide-carrot',
        children: [
          {
            label: t('ingredient'),
            dataType: FilterSelectMenuStatesType.INGREDIENT,
            slot: 'select',
          },
        ],
      },
      {
        label: t('ustensil'),
        icon: 'i-lucide-lab-whisk',
        children: [
          {
            label: t('ustensil'),
            dataType: FilterSelectMenuStatesType.USTENSIL,
            slot: 'select',
          },
        ],
      },
      {
        label: t('allergens'),
        icon: 'i-lucide-wheat',
        children: [
          {
            label: t('allergens'),
            dataType: FilterIconsGridStatesType.ALLERGEN,
            slot: 'grid',
          },
        ],
      },
      {
        label: t('mealTypes'),
        icon: 'i-lucide-clock-fading',
        children: [
          {
            label: t('mealTypes'),
            dataType: FilterSelectMenuStatesType.MEAL_TYPE,
            slot: 'select',
          },
        ],
      },
      {
        label: t('dishTypes'),
        icon: 'i-lucide-cooking-pot',
        children: [
          {
            label: t('dishTypes'),
            dataType: FilterSelectMenuStatesType.DISH_TYPE,
            slot: 'select',
          },
        ],
      },
    ]);
</script>

<template>
  <UNavigationMenu
    :items="items"
    orientation="vertical"
    :collapsed="collapsed"
    popover
  >
    <template #select="{ item }">
      <FilterCustomSelectComponent
        class="w-full"
        :placeholder="item['label']"
        :data-type="item['dataType']"
      />
    </template>
    <template #grid="{ item }">
      <FilterIconsGridComponent
        :data-type="item['dataType']"
      />
    </template>
    <!-- <template #switch="{ item }">
       <div class="w-full flex justify-between items-center">
        <div class="flex items-center gap-1.5">
          <UIcon
            :name="item['icon']"
            class="size-5"
          />
          {{ item['label'] }}
        </div>
        <USwitch
          unchecked-icon="i-lucide-x"
          checked-icon="i-lucide-check"
        />
      </div>
    </template> -->
  </UNavigationMenu>
</template>

<style lang="scss">

</style>
