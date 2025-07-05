<script lang="ts" setup>
</script>

<template>
  <UDashboardGroup>
    <UDashboardPanel id="home">
      <template #header>
        <UDashboardNavbar
          :title="$t('recipe', 2)"
          :ui="{ right: 'gap-3' }"
        >
          <template #title>
            <NuxtImg src="icon.dzqdzq" />
          </template>

          <template #right>
            <TranslationSelectComponent />
            <UColorModeButton />
            <UButton
              icon="i-simple-icons-github"
              color="neutral"
              variant="ghost"
              to="https://github.com/lviardcretat/recepto"
              target="_blank"
              aria-label="GitHub"
            />
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
</style>
