<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { PageFeatureProps } from '@nuxt/ui-pro';

definePageMeta({
	layout: 'auth',
});

const pageHeroLinks = ref<ButtonProps[]>([
	{
		label: 'Connectez-vous',
		to: '/login',
		icon: 'i-lucide-log-in',
	},
]);

const pageSectionFeatures = ref<PageFeatureProps[]>([
	{
		title: 'Bibliothèque de Recettes',
		description:
			"Stockez vos recettes préférées et explorez des variantes pour chaque plat. Plus jamais vous n'oublierez une recette.",
		icon: 'i-lucide-book',
	},
	{
		title: 'Filtres Intelligents',
		description:
			'Trouvez la recette parfaite en utilisant une multitude de filtres pour affiner vos recherches selon vos besoins.',
		icon: 'i-lucide-filter',
	},
	{
		title: 'Planification Hebdomadaire',
		description:
			'Organisez vos repas pour toute la semaine et gérez votre liste de courses directement depuis un calendrier hebdomadaire.',
		icon: 'i-lucide-calendar',
	},
	{
		title: 'Tableau de Bord',
		description:
			'Accédez à toutes vos recettes créées, consultez vos statistiques et partagez-les avec vos amis.',
		icon: 'i-lucide-layout-dashboard',
	},
	{
		title: 'Sécurité et vie privée',
		description:
			"Cuisinez en toute tranquillité, aucune de vos données n'est stockée ou partagée avec des tiers.",
		icon: 'i-lucide-lock',
	},
	{
		title: 'Collaboratif',
		description:
			'Notre site grandit avec vos recettes. Participez et faites partie de la communauté.',
		icon: 'i-lucide-users',
	},
]);
const pageSectionLinks = ref<ButtonProps[]>([
	{
		label: 'Connectez-vous',
		to: '/login',
		icon: 'i-lucide-log-in',
	},
]);
</script>

<template>
	<UPageHero
	    title="Recepto"
		headline="1.0.0"
		orientation="horizontal"
		description="Recepto est une collection collaborative de recettes et d'ingrédients pour un usage quotidien et accessible par tous."
		:links="pageHeroLinks">
		<img
			src="https://ui.nuxt.com/templates/dashboard1.png"
			alt="App screenshot"
			class="rounded-lg shadow-2xl ring ring-default"/>
	</UPageHero>
  	<UPageSection
		title="Une solution complète"
		icon="i-lucide-boxes"
		:features="pageSectionFeatures" :links="pageSectionLinks"/>
</template>
