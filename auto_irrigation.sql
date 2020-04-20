-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:33067
-- Generation Time: Apr 20, 2020 at 12:21 AM
-- Server version: 5.6.40-log
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auto_irrigation`
--
CREATE DATABASE IF NOT EXISTS `auto_irrigation` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `auto_irrigation`;

-- --------------------------------------------------------

--
-- Table structure for table `farmconfiguration`
--

CREATE TABLE `farmconfiguration` (
  `id` int(11) NOT NULL,
  `regionId` int(11) NOT NULL,
  `cropType` varchar(100) NOT NULL,
  `soilType` varchar(100) NOT NULL,
  `soilHumidityThreshold` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `farmconfiguration`
--

INSERT INTO `farmconfiguration` (`id`, `regionId`, `cropType`, `soilType`, `soilHumidityThreshold`) VALUES
(1, 1, 'Corn', 'Alfisols', 50),
(2, 2, 'Wheat', 'Inceptisols', 60),
(3, 3, 'Maize', 'Oxisols', 30),
(4, 4, 'Barley', 'Ultisols', 70);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `farmconfiguration`
--
ALTER TABLE `farmconfiguration`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `farmconfiguration`
--
ALTER TABLE `farmconfiguration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
