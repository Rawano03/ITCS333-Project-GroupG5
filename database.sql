-- Adminer 4.8.1 MySQL 10.6.7-MariaDB-log dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) DEFAULT NULL,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment_text` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_id` (`news_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `comments` (`id`, `news_id`, `author`, `comment_text`, `created_at`) VALUES
(24,	22,	'Amina',	'great idea',	'2025-05-03 07:57:42'),
(27,	22,	'Muna',	'wow nice.',	'2025-05-03 09:26:40'),
(28,	29,	'Ahmed',	'I will participate',	'2025-05-03 09:27:13'),
(29,	28,	'Ammar',	'thank you , I will register some courses',	'2025-05-03 09:27:54'),
(30,	27,	'Abdullah',	'we will do it',	'2025-05-03 09:28:27'),
(31,	26,	'Noor',	'we will take care',	'2025-05-03 09:29:09'),
(33,	25,	'Aysha',	'nice I will join it',	'2025-05-03 09:30:21'),
(34,	24,	'zahraa',	'the best club ever.',	'2025-05-03 09:30:47'),
(35,	23,	'Tasneem',	'great workshop idea',	'2025-05-03 09:31:30');

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `published_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `news` (`id`, `title`, `content`, `category`, `author`, `image`, `published_at`) VALUES
(22,	'Library is opened on weekends',	'as It final exam period we will open the library on the weekend so you can study.',	'announcements',	'Rawan Nabeel Salem',	'img_6815ca41743f94.56664336.jpeg',	'2025-05-02 07:50:16'),
(23,	'AI workshop will be held',	'AI is one of the most important things these days so you need to know about it.',	'events',	'Dr.Eman',	'img_6815d410856c02.90913227.jpeg',	'2025-05-03 08:30:08'),
(24,	'Cyber security club',	'if you want to join the cybersecurity club now is the time',	'announcements',	'Dr.Esra',	'img_6815d53ae87a02.22575642.jpg',	'2025-05-03 08:35:06'),
(25,	'spring club',	'join the club now , the registration is opened .',	'announcements',	'Dr.Tara',	'img_6815dbe7b74f12.84210993.jpeg',	'2025-05-03 09:03:35'),
(26,	'no lectures today',	'as the weather is rainy and the is a lot of traffic take care and there are no lectures today',	'alerts',	'UoB',	'img_6815dc630a85c3.01263673.jpeg',	'2025-05-03 09:05:39'),
(27,	'first semester registration is opened',	'you should register the courses for the first semester don\'t forget that .',	'alerts',	'Registration Department',	'img_6815dd15a35d99.22529220.jpeg',	'2025-05-03 09:08:37'),
(28,	'New sections are Added',	'there are new sections opened for some courses so register them if you want .',	'alerts',	'Registration',	'img_6815dde8d92386.45589852. _ Vecteur Premium',	'2025-05-03 09:12:08'),
(29,	'Acting competition',	'if you have an acting talent then you need to join the competition.',	'events',	'Communication department',	'img_6815de97b92df3.99243388.jpeg',	'2025-05-03 09:15:03');

-- 2025-05-03 09:48:18