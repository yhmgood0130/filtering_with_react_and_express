CREATE DATABASE IF NOT EXISTS `filtering`;

use `filtering`;

DROP TABLE IF EXISTS `filtering`;

CREATE TABLE `filtering` (
	 `id` TEXT NOT NULL,
	 `user_email` VARCHAR(320),
	 `user_first_name` VARCHAR(32),
	 `user_last_name` VARCHAR(32),
	 `screen_width` int(4),
	 `screen_height` int(4), 
	 `visits` BIGINT, 
	 `page_response` int(4), 
	 `domain` VARCHAR(255), 
	 `path` VARCHAR(255)
);