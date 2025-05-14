DROP TABLE IF EXISTS `activities`;

CREATE TABLE `activities` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `category` TEXT NOT NULL,
  `responsible_person` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `activities` (`name`, `category`, `responsible_person`, `email`, `description`) VALUES
('AI Workshop', 'workshops', 'Dr. Hanan', 'hanan@example.com', 'Introduction to Artificial Intelligence'),
('Cybersecurity Meetup', 'activities', 'Eng. Maraim', 'Maraim@example.com', 'Discussing modern cyber threats'),
('Hackathon 2025', 'hackathons', 'Club Admin', 'admin@uob.edu', '24-hour coding competition');
