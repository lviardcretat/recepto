/**
 * ! Executing this script will delete all data in your database and seed it with 10 season.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from '@snaplet/seed';

const main = async () => {
	const seed = await createSeedClient();

	// Truncate all tables in the database
	await seed.$resetDatabase();

	await seed.season((x) => x(4));
	await seed.foodType((x) => x(6));
	await seed.ustensil((x) => x(10));
	await seed.unit((x) => x(10));
	await seed.ingredient((x) => x(20));
	await seed.sequence((x) => x(20));
	await seed.recipeCategory((x) => x(20));
	await seed.recipeIngredient((x) => x(20));
	await seed.recipe((x) => x(20));
	await seed.user((x) => x(5));

	// Type completion not working? You might want to reload your TypeScript Server to pick up the changes

	console.log('Database seeded successfully!');

	process.exit();
};

main();
