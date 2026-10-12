CREATE TABLE `casters` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`seen` integer NOT NULL,
	`until` integer DEFAULT 0 NOT NULL
);
