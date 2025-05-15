CREATE DATABASE IF NOT EXISTS campus_hub
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE campus_hub;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(512),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_username (username)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS study_groups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  meeting_times VARCHAR(255) NOT NULL,
  current_focus VARCHAR(255),
  photo_url VARCHAR(512),
  members_count INT NOT NULL DEFAULT 0,
  max_members INT DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  creator_id INT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id),
  INDEX idx_subject (subject),
  FULLTEXT INDEX ftx_search (name, description)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS group_rules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  rule_text VARCHAR(255) NOT NULL,
  FOREIGN KEY (group_id) REFERENCES study_groups(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS group_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  user_id INT NOT NULL,
  role ENUM('Organizer', 'Member') NOT NULL DEFAULT 'Member',
  joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES study_groups(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_membership (group_id, user_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS group_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  group_id INT NOT NULL,
  user_id INT NOT NULL,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES study_groups(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

DELIMITER //
CREATE TRIGGER after_member_insert
AFTER INSERT ON group_members
FOR EACH ROW
BEGIN
  UPDATE study_groups 
  SET members_count = members_count + 1
  WHERE id = NEW.group_id;
END //

CREATE TRIGGER after_member_delete
AFTER DELETE ON group_members
FOR EACH ROW
BEGIN
  UPDATE study_groups 
  SET members_count = members_count - 1
  WHERE id = OLD.group_id;
END //
DELIMITER ;