-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 13, 2025 at 09:36 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketplace333`
--

-- --------------------------------------------------------

--
-- Table structure for table `marketplace_items`
--

CREATE TABLE `marketplace_items` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT 'img/default.jpg',
  `posted_by` varchar(100) DEFAULT 'You',
  `status` varchar(50) DEFAULT 'New',
  `category` varchar(100) DEFAULT 'other',
  `date_posted` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `marketplace_items`
--

INSERT INTO `marketplace_items` (`id`, `title`, `price`, `description`, `image`, `posted_by`, `status`, `category`, `date_posted`) VALUES
(1, 'Wireless Headphones', '15.00', 'Bluetooth headphones with noise-cancellation feature.', 'img/default.jpg', 'You', 'New', 'other', '2025-05-01'),
(2, 'Study Desk', '25.00', 'Spacious wooden study desk, lightly used.', 'img/default.jpg', 'You', 'Used', 'other', '2025-05-02'),
(3, 'Laptop Stand', '10.00', 'Aluminum laptop stand, ergonomic design.', 'img/default.jpg', 'You', 'New', 'other', '2025-05-03'),
(4, 'Art Supplies Kit', '8.50', 'Includes sketchbook, pencils, erasers.', 'img/default.jpg', 'You', 'Used', 'other', '2025-05-04'),
(5, 'Textbook: Intro to CS', '12.00', 'ITCS101 book, great condition.', 'img/default.jpg', 'You', 'Used', 'other', '2025-05-05'),
(6, 'hehehehe', '123213.00', '12321321', 'img/default.jpg', 'You', 'New', 'other', '2025-05-13'),
(7, 'new product', '232132.00', '321321321', 'img/default.jpg', 'You', 'New', 'other', '2025-05-13'),
(8, '123', '123.00', '123', 'img/default.jpg', 'You', 'New', 'other', '2025-05-13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `marketplace_items`
--
ALTER TABLE `marketplace_items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `marketplace_items`
--
ALTER TABLE `marketplace_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
