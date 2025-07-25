PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sequence` (
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
INSERT INTO `__new_sequence`("id", "name", "extra", "recipeId", "createdById", "createdAt", "updatedAt") SELECT "id", "name", "extra", "recipeId", "createdById", "createdAt", "updatedAt" FROM `sequence`;--> statement-breakpoint
DROP TABLE `sequence`;--> statement-breakpoint
ALTER TABLE `__new_sequence` RENAME TO `sequence`;--> statement-breakpoint
PRAGMA foreign_keys=ON;