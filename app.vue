<template>
	<NuxtLoadingIndicator :throttle="0" />
	<NuxtLayout>
		<SeasonalChart/>
		<NuxtPage/>
	</NuxtLayout>
	<UNotifications :ui="{ position: 'left-0 right-[unset]' }" />
</template>
