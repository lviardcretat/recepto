<script setup lang="ts">
import {
  VisXYContainer,
  VisAxis,
  VisTimeline,
  VisBulletLegend,
  VisTooltip,
} from '@unovis/vue';
import { colors, Timeline } from '@unovis/ts';
import type { BulletLegendItemInterface } from '@unovis/ts';
import { Months } from '~/enums/data';
import type { DataRecord } from '~~/server/api/ingredients/seasonals.get';
import type { ISeasonalDataRecord } from '~/types/ingredient/seasonal';

const nuxtApp = useNuxtApp();
const { t } = useI18n();

nuxtApp.hook('ingredient:created', async () => {
  clearNuxtData('ingredients-seasonals');
  await refreshDatasetsFetch();
});

const {
  data: datasetsFetch,
  refresh: refreshDatasetsFetch,
} = await useIngredientsRequest().getSeasonalsCached<ISeasonalDataRecord[]>({
  watch: false,
  default: () => [],
});

// Track inactive food type IDs separately to avoid mutating fetched data
const inactiveFoodTypeIds = ref<Set<number>>(new Set());

// Computed that filters data reactively when datasetsFetch or inactiveFoodTypeIds change
const datasetsFetchFiltered = computed(() =>
  datasetsFetch.value.filter(item => !inactiveFoodTypeIds.value.has(item.typeId)),
);

const {
  data: foodTypesFetch,
} = await useFoodTypesRequest().getAllCached({
  watch: false,
  default: () => [],
});

const x = (d: DataRecord) => d.startMonth;
const length = (d: DataRecord) => {
  return d.endMonth - d.startMonth > 0 ? d.endMonth - d.startMonth : 1;
};
const type = (d: DataRecord) => d.name;
const color = (d: DataRecord) => colors[d.typeId];
const legendItems = ref<BulletLegendItemInterface[]>(foodTypesFetch.value.slice(0, 2).map(foodType => ({
  name: foodType.name,
  inactive: false,
  color: colors[foodType.id],
})) ?? []);
const triggers = {
  [Timeline.selectors.line]: (d: DataRecord) => {
    const startMonth: string = Object.values(Months)[d.startMonth] ?? 'undefined';
    const endMonth: string = Object.values(Months)[d.endMonth - 1] ?? 'undefined';
    if (startMonth === endMonth) {
      return t(`months.${startMonth}`);
    }
    return t('fromTo', {
      from: t(`months.${startMonth}`),
      to: t(`months.${endMonth}`),
    });
  },
};
const tickFormat = (tick: number) => {
  return t(`months.${Object.values(Months)[tick]}`);
};

function filterItems(_item: BulletLegendItemInterface, i: number): void {
  const legendItem = legendItems.value[i];
  const foodType = foodTypesFetch.value[i];

  if (!legendItem || !foodType) return;

  // Toggle inactive state in legend
  legendItem.inactive = !legendItem.inactive;

  // Update inactive food type IDs set
  if (legendItem.inactive) {
    inactiveFoodTypeIds.value.add(foodType.id);
  }
  else {
    inactiveFoodTypeIds.value.delete(foodType.id);
  }
}
</script>

<template>
  <!-- eslint-disable vue/attribute-hyphenation -->
  <UModal
    :title="$t('mainSlideOver.seasonalIngredients')"
    class="z-10 max-w-7xl"
  >
    <template #body>
      <div class="m-9 customTimeline">
        <VisXYContainer
          :data="datasetsFetchFiltered"
          :height="500"
          :xDomain="[0, 12]"
        >
          <VisBulletLegend
            :items="legendItems"
            class="flex! justify-center mb-6"
            :onLegendItemClick="filterItems"
          />
          <VisTimeline
            :x="x"
            :length="length"
            :type="type"
            :showLabels="true"
            :color="color"
            :lineCap="true"
          />
          <VisAxis
            type="x"
            :tickValues="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
            :tickFormat="tickFormat"
            :domainLine="false"
          />
          <VisTooltip :triggers="triggers" />
        </VisXYContainer>
      </div>
    </template>
  </UModal>
</template>

<style lang="scss">
.customTimeline {
  --vis-timeline-row-even-fill-color: var(--ui-bg);
  --vis-timeline-row-odd-fill-color: var(--ui-bg);
  --vis-timeline-scrollbar-background-color: var(--ui-bg);
  --vis-timeline-scrollbar-color: var(--ui-text);
  --vis-timeline-label-color: var(--ui-text);

  --vis-axis-tick-label-color: var(--ui-text);

  --vis-legend-label-color: var(--ui-text);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
