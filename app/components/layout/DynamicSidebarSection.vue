<script setup lang="ts">
import { FilterPanelComponent } from '#components';
import { getSidebarDynamicSectionConfig, getComponentForRoute } from '~/config/layout/SidebarDynamicSectionConfig';
import type { Component } from 'vue';

defineProps<{
  collapsed?: boolean;
}>();

const route = useRoute();
const config = getSidebarDynamicSectionConfig();

// Component mapping
const componentMap: Record<string, Component> = {
  FilterPanelComponent: FilterPanelComponent,
};

// Compute the component to display based on current route
const currentComponent = computed((): Component | null => {
  const componentName = getComponentForRoute(route.path, config);
  if (!componentName) {
    return null;
  }

  // Return the component from the mapping
  return componentMap[componentName] || null;
});
</script>

<template>
  <component
    :is="currentComponent"
    v-if="currentComponent"
    :collapsed="collapsed"
  />
</template>
