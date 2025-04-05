<script setup lang="ts">
</script>

<template>
	<UDashboardGroup>
		<UDashboardPanel>
			<template #header>
				<UDashboardNavbar>
					<template #left>
						<h1 class="font-bold">{{ $t('recipe', 2) }}</h1>
					</template>
					<template #right>
						<div class="flex justify-end gap-3">
							<TranslationSelect></TranslationSelect>
							<UColorModeButton />
							<MainSlideover></MainSlideover>
						</div>
					</template>
				</UDashboardNavbar>
			</template>
			<template #body>
				<slot />
			</template>
		</UDashboardPanel>
		<CreationButton/>
	</UDashboardGroup>
</template>
