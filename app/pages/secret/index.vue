<template>
  <div class="secret-page flex flex-col items-center justify-center min-h-screen gap-6 bg-black text-red-500">
    <template v-if="isCountdownFinished">
      <UInput
        v-if="!success"
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        size="xl"
        @keyup.enter="checkPassword"
      />
      <p v-if="showError">
        Le mot de passe est incorrect
      </p>
      <video
        v-if="success"
        controls
        autoplay
        preload="auto"
        class="w-full h-full object-contain"
        :src="videoUrl"
      />
    </template>

    <template v-else>
      <div class="text-6xl font-bold font-mono">
        {{ countdown }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const password = ref('');
const showError = ref(false);
const videoUrl = '/api/blob/secret.mp4';

const targetDate = new Date('2025-12-26T10:00:00');
const now = ref(new Date());

const isCountdownFinished = computed(() => now.value >= targetDate);
const success = ref(false);

const countdown = computed(() => {
  const diff = targetDate.getTime() - now.value.getTime();

  if (diff <= 0) return '00:00:00:00';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(days)}j ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
});

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  interval = setInterval(() => {
    now.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

async function checkPassword() {
  if (password.value === 'temporel') {
    success.value = true;
  }
  else if (password.value === 'ca12') {
    await navigateTo('/secret/hints');
  }
  else {
    showError.value = true;
  }
}
</script>

<style scoped>
.secret-page {
  /* Background colors */
  --ui-bg: black !important;
  --ui-bg-muted: black !important;
  --ui-bg-elevated: black !important;
  --ui-bg-accented: black !important;
  --ui-bg-inverted: red !important;

  /* Text colors */
  --ui-text: red !important;
  --ui-text-muted: red !important;
  --ui-text-dimmed: red !important;
  --ui-text-toned: red !important;
  --ui-text-highlighted: red !important;
  --ui-text-inverted: black !important;

  /* Border colors */
  --ui-border: red !important;
  --ui-border-muted: red !important;
  --ui-border-accented: red !important;
  --ui-border-inverted: red !important;

  /* Primary color */
  --ui-primary: red !important;

  /* Color shades */
  --ui-color-primary-50: red !important;
  --ui-color-primary-100: red !important;
  --ui-color-primary-200: red !important;
  --ui-color-primary-300: red !important;
  --ui-color-primary-400: red !important;
  --ui-color-primary-500: red !important;
  --ui-color-primary-600: red !important;
  --ui-color-primary-700: red !important;
  --ui-color-primary-800: red !important;
  --ui-color-primary-900: red !important;
  --ui-color-primary-950: red !important;

  /* Neutral shades */
  --ui-color-neutral-50: red !important;
  --ui-color-neutral-100: red !important;
  --ui-color-neutral-200: red !important;
  --ui-color-neutral-300: red !important;
  --ui-color-neutral-400: red !important;
  --ui-color-neutral-500: red !important;
  --ui-color-neutral-600: red !important;
  --ui-color-neutral-700: red !important;
  --ui-color-neutral-800: black !important;
  --ui-color-neutral-900: black !important;
  --ui-color-neutral-950: black !important;

  /* Ring/focus colors */
  --ui-ring: red !important;
  --ui-ring-offset: black !important;
}
</style>
