CREATE TABLE `tasks_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`dueAt` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL
);
