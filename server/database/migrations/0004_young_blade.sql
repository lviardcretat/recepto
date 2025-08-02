DROP TABLE IF EXISTS `account`;--> statement-breakpoint
DROP TABLE IF EXISTS `session`;--> statement-breakpoint
DROP TABLE IF EXISTS `verification`;--> statement-breakpoint
DROP INDEX IF EXISTS `user_email_unique`;--> statement-breakpoint
ALTER TABLE `user` ADD `password` text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `emailVerified`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `image`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `banned`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `banReason`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `banExpires`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `displayUsername`;
