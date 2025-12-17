<script setup lang="ts">
</script>

<template>
  <UDashboardGroup unit="rem">
    <LayoutDashboardSidebarComponent />
    <CustomDashboardSearchComponent />
    <CreationButtonComponent />

    <UDashboardPanel id="home">
      <template #header>
        <UDashboardNavbar
          :title="$t('recipe', 2)"
          :ui="{ right: 'gap-3' }"
        >
          <template #leading>
            <UDashboardSidebarCollapse />
          </template>

          <template #right>
            <TranslationSelectComponent />
            <UColorModeButton />
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<style>
  button:not(*:disabled) > .inherit {
    width: inherit;
  }
</style>
