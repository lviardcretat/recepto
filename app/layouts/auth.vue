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
            <NuxtImg
              class="h-full pt-4 pb-4"
              src="/logo.png"
            />
          </template>

          <template #right>
            <TranslationSelectComponent />
            <UColorModeButton />
            <USeparator
              orientation="vertical"
              class="h-5"
            />
            <UButton
              icon="i-lucide-github"
              color="neutral"
              variant="ghost"
              to="https://github.com/lviardcretat/recepto"
              target="_blank"
              aria-label="GitHub"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="ic:baseline-discord"
              to="https://discord.gg/vF7FbDpDwt"
              target="_blank"
              aria-label="Discord"
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
