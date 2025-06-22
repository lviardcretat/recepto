<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { authClient } from '~/lib/auth-client';

const { t } = useI18n();
const toast = useToast();

const fields = [
	{
		name: 'username',
		type: 'text' as const,
		label: t('auth.username'),
		required: true,
	},
	{
		name: 'password',
		label: t('auth.password'),
		type: 'password' as const,
		required: true,
	},
	{
		name: 'remember',
		label: 'Remember me',
		type: 'checkbox' as const,
	},
];

const schema = z.object({
	username: z.string().min(3, 'Trop court !'),
	password: z.string().min(8, 'Must be at least 8 characters'),
	rememberMe: z.boolean().optional(),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
	const response = await authClient.signIn.username({
		username: payload.data.username,
		password: payload.data.password,
		rememberMe: payload.data.rememberMe,
	});

	if (response.error != null) {
		toast.add({
			title: t('auth.login.failedToastTitle'),
			description: response.error.message,
			color: 'error',
		});
		return null;
	}

	return navigateTo('/recipes/all');
}
</script>

<template>
	<div class="w-full mt-10">
		<UAuthForm
			:schema="schema"
			:title="$t('auth.login.title')"
			:description="$t('auth.login.description')"
			icon="i-lucide-lock"
			:fields="fields"
			@submit="onSubmit"
			:submit="{ label: $t('auth.login.button') }"
		/>
	</div>
</template>
