PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_ingredient` (
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
INSERT INTO `__new_ingredient`("id", "name", "foodTypeId", "seasonalMonths", "createdById", "createdAt", "updatedAt") SELECT "id", "name", "foodTypeId", "seasonalMonths", "createdById", "createdAt", "updatedAt" FROM `ingredient`;--> statement-breakpoint
DROP TABLE `ingredient`;--> statement-breakpoint
ALTER TABLE `__new_ingredient` RENAME TO `ingredient`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_recipeIngredient` (
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
INSERT INTO `__new_recipeIngredient`("id", "ingredientId", "recipeId", "quantity", "unitId") SELECT "id", "ingredientId", "recipeId", "quantity", "unitId" FROM `recipeIngredient`;--> statement-breakpoint
DROP TABLE `recipeIngredient`;--> statement-breakpoint
ALTER TABLE `__new_recipeIngredient` RENAME TO `recipeIngredient`;