import type { Ingredient } from '@prisma/client';

export const useIngredients = () => {
	const getIngredients = async () => {
		const { data } = await useFetch<Ingredient>('/api/ingredients');
		console.log(data.value);
	};

	return {
		getIngredients,
	};
};
