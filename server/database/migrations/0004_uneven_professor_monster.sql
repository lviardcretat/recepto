PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer DEFAULT false NOT NULL,
	`image` text,
	`role` text DEFAULT 'user' NOT NULL,
	`banned` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`banReason` text,
	`banExpires` integer,
	`username` text NOT NULL,
	`displayUsername` text NOT NULL,
	`isAnonymous` integer DEFAULT false NOT NULL,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updatedAt` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_user`("id", "email", "emailVerified", "image", "role", "banned", "name", "banReason", "banExpires", "username", "displayUsername", "isAnonymous", "createdAt", "updatedAt") SELECT "id", "email", "emailVerified", "image", "role", "banned", "name", "banReason", "banExpires", "username", "displayUsername", "isAnonymous", "createdAt", "updatedAt" FROM `user`;--> statement-breakpoint
DROP TABLE `user`;--> statement-breakpoint
ALTER TABLE `__new_user` RENAME TO `user`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);