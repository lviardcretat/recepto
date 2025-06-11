<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const items = ref<TabsItem[]>([
  {
    label: 'Login',
    icon: 'i-lucide-user',
  },
  {
    label: 'Register',
    icon: 'i-lucide-lock',
  }
])
</script>

<template>
  <UTabs :items="items" class="w-full">
	<template #content="{ item }">
      <LoginVue v-if="item.label === 'Login'" />
      <RegisterVue v-if="item.label === 'Register'" />
    </template>
  </UTabs>
</template>
