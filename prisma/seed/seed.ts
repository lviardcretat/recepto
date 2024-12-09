import { PrismaClient } from '@prisma/client';
import { seed_foodType } from './models/foodType';
import { seed_user } from './models/user';
import { seed_unit } from './models/unit';
import { seed_season } from './models/season';
import { seed_recipesCategory } from './models/recipesCategory';
import { seed_ingredient } from './models/ingredient';
import { seed_recipeIngredient } from './models/recipeIngredient';
import { seed_ustensil } from './models/ustensil';
import { seed_recipe } from './models/recipe';
import { seed_mealType } from './models/mealType';
import { seed_allergen } from './models/allergen';

const prisma = new PrismaClient();

async function main() {
	await seed_user(prisma);
	await seed_mealType(prisma);
	await seed_allergen(prisma);
	await seed_season(prisma);
	await seed_foodType(prisma);
	await seed_ustensil(prisma);
	await seed_recipesCategory(prisma);
	await seed_ingredient(prisma);
	await seed_unit(prisma);
	await seed_recipe(prisma);
	await seed_recipeIngredient(prisma);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
