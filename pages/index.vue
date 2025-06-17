<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';
import { LoginType } from '~/global/enums/login';

definePageMeta({
	layout: 'auth',
});
const { t } = useI18n();
const items = ref<TabsItem[]>([
	{
		label: t('auth.login.tab'),
		icon: 'i-lucide-lock',
		type: LoginType.Login,
	},
	{
		label: t('auth.register.tab'),
		icon: 'i-lucide-user',
		type: LoginType.Register,
	},
]);
</script>

<template>
	<UPageCard class="m-auto w-1/3 h-[65vh]">
		<UTabs :items="items" class="mb-6">
			<template #content="{ item }">
				<Login v-if="item.type === LoginType.Login" />
				<Register v-if="item.type === LoginType.Register" />
			</template>
		</UTabs>
	</UPageCard>
</template>
