CREATE DATABASE IF NOT EXISTS `session`;

use `session`;

DROP TABLE IF EXISTS `session`;
DROP TABLE IF EXISTS `session_type`;

CREATE TABLE `session` (
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

CREATE TABLE `session_type` (
	`value` VARCHAR(32) NOT NULL,
	`label` VARCHAR(32) NOT NULL,
	`type` VARCHAR(32) NOT NULL
);

INSERT INTO `session` VALUES ('dd37d54d-62b5-47c9-9b48-56e2a0f79598',	'lex_4312@gmail.com',	'Lex',	'Luther',	'1024',	'768',	'1312',	'13',	'lexisalive.com',	'lexpath');
INSERT INTO `session` VALUES ('60735f6f-46d1-4a11-936f-5d4d8e511fb4',	'sam_6613@gmail.com',	'Sam',	'Smith',	'1920',	'1080',	'26',	'13',	'samisgone.com',	'lexpath');
INSERT INTO `session` VALUES ('33f2e0b0-22d3-43d9-990c-1cc71251eb47',	'belmar1112@gmail.com',	'Bel',	'Mar',	'1400',	'768',	'33',	'13',	'cakeislie.com',	'lexpath');
INSERT INTO `session` VALUES ('9bc0ce62-f830-4fa5-85bf-47cac4bd1ca2',	'thething13@gmail.com',	'the',	'thing',	'2400',	'1200',	'15323',	'13',	'thething.com',	'lexpath');
INSERT INTO `session` VALUES ('ea153b1e-f5d2-4f23-89be-63b0e1029537',	'elia1332@gmail.com',	'elia',	'suhr',	'1920',	'1080',	'1312',	'2',	'eliaskate.com',	'lexpath');
INSERT INTO `session` VALUES ('df741176-f0b0-4015-80cf-5f88f1939c37',	'example.service@gmail.com',	'ex',	'ample',	'1024',	'768',	'0',	'13',	'qwerty1234.com',	'lexpath');
INSERT INTO `session` VALUES ('fb238f07-80c6-483b-9b25-68dbcd7315d5',	'qwery3122@yahoo.com',	'qwer',	'lee',	'1280',	'1024',	'1312',	'155',	'example1231.com',	'lexpath');
INSERT INTO `session` VALUES ('029989a5-7ed3-4775-ad55-9b96341d5686',	'denver.colorado@aol.com',	'Denver',	'Colorado',	'860',	'480',	'619',	'13',	'arapahoedenver.com',	'lexpath');
INSERT INTO `session` VALUES ('dd37d54d-62b5-47c9-9b48-56e2a0f79598',	'arapahoe.library@school.com',	'Arapahoe',	'Library',	'1920',	'1080',	'720',	'13',	'denverdui.com',	'lexpath');
INSERT INTO `session` VALUES ('f6057536-ecce-45a8-a4b8-e0313bbcf81c',	'peoplefree@gmail.com',	'People',	'Free',	'1400',	'768',	'312',	'13',	'therock.com',	'lexpath');
INSERT INTO `session` VALUES ('70997f1b-fa9d-4a3b-8fe7-357e4d841cff',	'the.den@gmail.com',	'The',	'Den',	'1024',	'768',	'443',	'13',	'apartmentexpert.com',	'lexpath');
INSERT INTO `session` VALUES ('abf5b11a-55d0-4146-8c90-ec1016cf7666',	'plisskin.snake@gmail.com',	'Plisskin',	'Snake',	'320',	'168',	'753',	'13',	'callmesnake.com',	'lexpath');
INSERT INTO `session` VALUES ('e35d6e98-06af-4932-a13f-ec1ba6df0eec',	'escapefromnewyork@gmail.com',	'Van',	'Hawk',	'860',	'480',	'14312',	'13',	'ihaveajobforyou.com',	'lexpath');

INSERT INTO `session_type` VALUES ('id','id','string'), ('user_email', 'User Email','string'),('user_first_name', 'User First Name','string'),('user_last_name', 'User Last Name','string'),('screen_width', 'Screen Width','number'),('screen_height', 'Screen Height','number'),('visits', '# of Visits','number'),('page_response', 'Page Response Time(ms)','number'),('domain', 'Domain','string'),('path', 'Path','string');