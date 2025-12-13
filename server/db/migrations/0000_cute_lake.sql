CREATE TABLE `allergen` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon` text,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `allergenToRecipe` (
	`allergenId` integer NOT NULL,
	`recipeId` integer NOT NULL,
	PRIMARY KEY(`allergenId`, `recipeId`),
	FOREIGN KEY (`allergenId`) REFERENCES `allergen`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dishType` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `foodType` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`foodTypeId` integer NOT NULL,
	`seasonalMonths` text,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`foodTypeId`) REFERENCES `foodType`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `mealType` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `mealTypeToRecipeCategory` (
	`mealTypeId` integer NOT NULL,
	`recipeCategoryId` integer NOT NULL,
	PRIMARY KEY(`mealTypeId`, `recipeCategoryId`),
	FOREIGN KEY (`mealTypeId`) REFERENCES `mealType`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipeCategoryId`) REFERENCES `recipesCategory`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `recipe` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`peopleNumber` integer NOT NULL,
	`cookingTime` real,
	`preparationTime` real,
	`restTime` real,
	`description` text,
	`tips` text,
	`seasonId` integer NOT NULL,
	`recipesCategoryId` integer NOT NULL,
	`createdById` integer NOT NULL,
	`selectMenuType` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`seasonId`) REFERENCES `season`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipesCategoryId`) REFERENCES `recipesCategory`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `recipeIngredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ingredientId` integer NOT NULL,
	`recipeId` integer NOT NULL,
	`quantity` integer NOT NULL,
	`unitId` integer,
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`unitId`) REFERENCES `unit`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `recipeToUstensil` (
	`recipeId` integer NOT NULL,
	`ustensilId` integer NOT NULL,
	PRIMARY KEY(`recipeId`, `ustensilId`),
	FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ustensilId`) REFERENCES `ustensil`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `recipesCategory` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`dishTypeId` integer NOT NULL,
	`createdById` integer NOT NULL,
	`selectMenuType` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`dishTypeId`) REFERENCES `dishType`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `season` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`start` integer NOT NULL,
	`end` integer NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sequence` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`extra` text,
	`recipeId` integer NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `unit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`shortForm` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text,
	`isAnonymous` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE TABLE `ustensil` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
