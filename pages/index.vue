<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { LoginType } from '~/enums/login';

definePageMeta({
	layout: 'auth',
});
const { t } = useI18n();
const items = ref<TabsItem[]>([
	{
		label: t('auth.login.tab'),
		icon: 'i-lucide-lock',
		type: LoginType.LOGIN,
	},
	{
		label: t('auth.register.tab'),
		icon: 'i-lucide-user',
		type: LoginType.REGISTER,
	},
]);

const links = ref([
	{
		label: 'Get started',
		to: '/getting-started',
		icon: 'i-lucide-square-play',
	},
	{
		label: 'Learn more',
		to: '/getting-started/theme',
		color: 'neutral',
		variant: 'subtle',
		trailingIcon: 'i-lucide-arrow-right',
	},
]);

const features = ref([
	{
		title: 'Icons',
		description:
			'Nuxt UI integrates with Nuxt Icon to access over 200,000+ icons from Iconify.',
		icon: 'i-lucide-smile',
		to: '/getting-started/icons',
	},
	{
		title: 'Fonts',
		description:
			'Nuxt UI integrates with Nuxt Fonts to provide plug-and-play font optimization.',
		icon: 'i-lucide-a-large-small',
		to: '/getting-started/fonts',
	},
	{
		title: 'Color Mode',
		description:
			'Nuxt UI integrates with Nuxt Color Mode to switch between light and dark.',
		icon: 'i-lucide-sun-moon',
		to: '/getting-started/color-mode',
	},
]);

const { data: home } = await useAsyncData(() =>
	queryCollection('content').path('/').first(),
);

useSeoMeta({
	title: home.value?.title,
	description: home.value?.description,
});
</script>

<template>
	<ContentRenderer v-if="home" :value="home" />
	<UPageHero
	    title="Ultimate Vue UI library"
    description="A Nuxt/Vue-integrated UI library providing a rich set of fully-styled, accessible and highly customizable components for building modern web applications."
    :links="links"/>

  	<UPageSection
    title="Beautiful Vue UI components"
    description="Nuxt UI provides a comprehensive suite of components and utilities to help you build beautiful and accessible web applications with Vue and Nuxt."
    :features="features"
  />
	<UPageCard>
		<UTabs :items="items" class="mb-6">
			<template #content="{ item }">
				<AuthLoginComponent v-if="item.type === LoginType.LOGIN" />
				<AuthRegisterComponent v-if="item.type === LoginType.REGISTER" />
			</template>
		</UTabs>
	</UPageCard>
</template>
