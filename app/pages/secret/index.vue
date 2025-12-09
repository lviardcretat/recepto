<template>
  <div class="flex flex-col items-center justify-center min-h-screen gap-6">
    <h1 class="text-3xl font-bold">
      Page Secrète
    </h1>
    <UInput
      v-model="password"
      type="password"
      placeholder="Mot de passe"
      size="lg"
      @keyup.enter="checkPassword"
    />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const password = ref('');
const toast = useToast();

async function checkPassword() {
  if (password.value === '123') {
    await navigateTo('/secret/video');
  }
  else if (password.value === 'ca12') {
    await navigateTo('/secret/hints');
  }
  else {
    toast.add({
      title: 'Mot de passe incorrect',
      color: 'error',
    });
  }
}
</script>

<style>

</style>
