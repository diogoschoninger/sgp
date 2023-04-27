CREATE DATABASE IF NOT EXISTS `sgp`;

USE `sgp`;

CREATE TABLE IF NOT EXISTS `fin_operations_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `fin_operations_payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `fin_operations_sides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `fin_operations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `value` decimal(12,2) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `userOwner` int NOT NULL,
  `payment` int NOT NULL,
  `group` int NOT NULL,
  `side` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userOwner` (`userOwner`),
  KEY `payment` (`payment`),
  KEY `group` (`group`),
  KEY `side` (`side`),
  CONSTRAINT `fk_userOwner` FOREIGN KEY (`userOwner`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_payment` FOREIGN KEY (`payment`) REFERENCES `fin_operations_payments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_group` FOREIGN KEY (`group`) REFERENCES `fin_operations_groups` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_side` FOREIGN KEY (`side`) REFERENCES `fin_operations_sides` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;