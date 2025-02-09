CREATE TABLE `allergen` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon` text,
	`createdById` integer NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
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
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `foodType` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `ingredient` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`foodTypeId` integer NOT NULL,
	`seasonalMonths` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
	FOREIGN KEY (`foodTypeId`) REFERENCES `foodType`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `mealType` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
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
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
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
	`unitId` integer NOT NULL,
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
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
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
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `sequence` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`recipeId` integer NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
	FOREIGN KEY (`recipeId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `unit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`shortForm` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`firstname` text NOT NULL,
	`lastname` text NOT NULL,
	`role` text NOT NULL,
	`avatar` text NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `ustensil` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdById` integer NOT NULL,
	`createdAt` integer DEFAULT (currentTimestamp) NOT NULL,
	`updatedAt` integer DEFAULT (currentTimestamp) NOT NULL,
	FOREIGN KEY (`createdById`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
