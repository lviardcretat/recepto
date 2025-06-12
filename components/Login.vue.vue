<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import { authClient } from '~/lib/auth-client';

const toast = useToast();

const fields = [
	{
		name: 'username',
		type: 'text' as const,
		label: 'Username',
		required: true,
	},
	{
		name: 'password',
		label: 'Password',
		type: 'password' as const,
		required: true,
	},
];

const schema = z.object({
	username: z.string().min(3, 'Trop court !'),
	password: z.string().min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

async function onSubmit(payload: FormSubmitEvent<Schema>) {
	const response = await authClient.signIn.username({
		username: payload.data.username,
		password: payload.data.password,
	});

	if (response.error != null) {
		toast.add({
			title: 'Error signing in',
			description: response.error.message,
			color: 'error',
		});
		return null;
	}

	return navigateTo('/search');
}
</script>

<template>
	<div class="flex flex-col items-center justify-center gap-4 p-4">
		<UPageCard class="w-full max-w-md">
		<UAuthForm
			:schema="schema"
			title="Login"
			description="Enter your credentials to access your account."
			icon="i-lucide-lock"
			:fields="fields"
			@submit="onSubmit"
			:submit="{ label: 'Sign in' }"
		/>
		</UPageCard>
  	</div>
</template>
