<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import { getPanelConfig } from '~/config/filter/PanelConfig';
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
const panelConfig = getPanelConfig(t, {});

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

function resetAllFilters() {
  useResetAllFilters();
}
</script>

<template>
  <UNavigationMenu
    :items="panelConfig"
    orientation="vertical"
    :collapsed="collapsed"
    popover
    :ui="{ linkLabel: 'px-2.5', label: 'px-0' }"
  >
    <template #filter-trailing="{ item }: { item: NavigationMenuItem & CustomAccordionItem }">
      <UButton
        class="px-2.5"
        :icon="item.trailingIcon"
        variant="ghost"
        @click="resetAllFilters()"
      />
    </template>
    <template #select="{ item }: { item: NavigationMenuItem & CustomAccordionItem }">
      <FilterCustomSelectComponent
        v-if="item.label && item.dataType"
        class="w-full"
        :placeholder="item.label"
        :data-type="item.dataType as FilterSelectMenuStatesType"
      />
    </template>
    <template #grid="{ item }: { item: NavigationMenuItem & CustomAccordionItem }">
      <FilterIconsGridComponent
        v-if="item.dataType"
        :data-type="item.dataType as FilterIconsGridStatesType"
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
