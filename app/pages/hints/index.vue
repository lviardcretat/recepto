<template>
  <div class="min-h-screen bg-gray-900 py-12">
    <h1 class="text-6xl font-bold text-center text-white mb-4">
      Joyeux anniversaire !
    </h1>
    <p class="text-4xl font-bold text-center text-pink-400 mb-12">
      Pour tes
      <Transition
        name="fade"
        mode="out-in"
      >
        <span :key="currentCalculation">{{ calculations[currentCalculation] }}</span>
      </Transition>
      ans !
    </p>
    <UPageColumns>
      <NuxtImg
        v-for="i in 52"
        :key="i"
        :src="`/flo/image${i}.jpeg`"
      />
    </UPageColumns>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const calculations = [
  '100 / 4',
  '5 x 5',
  '50 - 25',
  '12 + 13',
  '75 - 50',
  '20 + 5',
  '250 / 10',
  '(3² + 4²) / 1',
  '5!  / (4 + 1)',
  '(2³ x 5) - 15',
  '√625',
  '(100 - 50) / 2',
  '∫₀⁵ 2x dx',
  '(7² - 24)',
  '(3³ - 2)',
  '5² + 0²',
  'log₁₀(10²⁵)',
  '(2⁴ + 9)',
  '((6! / 24) - 5)',
  '(50 x 2) / 4',
  '∑(n=1 to 5) n² / 11',
];

const currentCalculation = ref(0);

onMounted(() => {
  setInterval(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * calculations.length);
    } while (newIndex === currentCalculation.value);
    currentCalculation.value = newIndex;
  }, 3000);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
