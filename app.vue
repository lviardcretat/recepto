<template>
	<UApp :toaster="{ position: 'bottom-left' }">
		<!-- <NuxtLoadingIndicator :throttle="0" /> -->
		<NuxtLayout>
			<SeasonalChart/>
			<NuxtPage/>
		</NuxtLayout>
	</UApp>
</template>
