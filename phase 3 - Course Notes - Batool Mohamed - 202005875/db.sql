SET NAMES utf8;
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `course-details`;
DROP TABLE IF EXISTS `course-comments`;

CREATE TABLE `course-details` (
  `course-id` int(3) NOT NULL AUTO_INCREMENT,
  `course-code` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course-title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course-department` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course-description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `course-level` int(1) DEFAULT NULL,
  `notes_file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`course-id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `course-details` (`course-id`, `course-code`, `course-title`, `course-department`, `course-description`, `course-level`, `notes_file`) VALUES
(1, 'ITCS113', 'Computer Programming I', 'CS', 'This course introduces problem solving, fundamental programming concepts and techniques implemented by a high-level programming language.', 1, ''),
(2, 'ITCE114', 'Digital Design I', 'CE', 'This course covers the fundamentals of digital logic and design.', 1, ''),
(3, 'ITIS213', 'Database Management Systems', 'IS', 'This course presents the fundamental concepts for designing, using, and implementing database systems.', 2, ''),
(4, 'ITCS214', 'Data Structures', 'CS', 'This course covers data structures and their implementations in an object-oriented programming language.', 2, ''),
(5, 'ITCE250', 'Digital Logic', 'CE', 'This course covers number systems, combinational logic circuits and network design, MSI integrated circuits in combinational networks design, and sequential circuits analysis and design.', 2, ''),
(6, 'ITCS316', 'Human-Computer Interaction', 'CS', 'This course covers techniques used to analyze and design Human-Computer Interaction systems.', 3, ''),
(7, 'ITCS333', 'Internet Software Development', 'CS', 'This course exposes the key technologies underlying the World-Wide Web and the principles and tools that are used to develop dynamic web applications.', 3, ''),
(8, 'ITIS420', 'Multimedia Technology and Design', 'IS', 'This course introduces the student to standard and newly developed interactive multimedia technologies.', 4, ''),
(9, 'ITCS453', 'Multimedia and Hypermedia Systems', 'CS', 'TThis course covers techniques used to design multimedia systems using conceptual frameworks and multimedia authoring tools.', 4, '');

CREATE TABLE `notes_comments` (
  `comment-id` int(3) NOT NULL AUTO_INCREMENT,
  `course-id` int(3) DEFAULT NULL,
  `author` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`comment-id`),
  KEY `course-id` (`course-id`),
  CONSTRAINT `notes_comments_ibfk_1` FOREIGN KEY (`course-id`) REFERENCES `course-details` (`course-id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `notes_comments` (`comment-id`, `course-id`, `author`, `comment`) VALUES
(1, 6, 'Ahmed', 'This is really helpful, thank you!'),
(2, 6, 'Noor', 'Appreciate the effort.'),
(3, 7, 'Muna', 'Exactly what I needed for revision.'),
(4, 7, 'Fay', 'These notes are really helpfull. Thank you.'),
(5, 9, 'Mohamed', 'Thank you so much for sharing the notes, helped alot with my project.'),
(6, 9, 'Sara', 'Helped me a lot before the exam. Thanks!'),
(7, 9, 'Ali', 'Clear and easy to understand. Thank you.');