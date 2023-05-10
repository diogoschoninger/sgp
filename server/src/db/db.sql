CREATE DATABASE IF NOT EXISTS `sgp`;

USE `sgp`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `fin_operations_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `fin_operations_groups` (`id`, `description`) VALUES
	(1, 'Essenciais'),
	(2, 'Livres'),
	(3, 'Reservas'),
	(4, 'Investimentos'),
	(5, 'Entradas');

CREATE TABLE IF NOT EXISTS `fin_operations_payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `fin_operations_payments` (`id`, `description`) VALUES
	(1, 'Dinheiro'),
	(2, 'Cartão');

CREATE TABLE IF NOT EXISTS `fin_operations_sides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `fin_operations_sides` (`id`, `description`) VALUES
	(1, 'Entrada'),
	(2, 'Saída');

CREATE TABLE IF NOT EXISTS `fin_operations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` decimal(12,2) NOT NULL,
  `date` date NOT NULL,
  `user_owner` int NOT NULL,
  `payment` int NOT NULL,
  `group` int NOT NULL,
  `side` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_owner` (`user_owner`),
  KEY `payment` (`payment`),
  KEY `group` (`group`),
  KEY `side` (`side`),
  CONSTRAINT `fk_group` FOREIGN KEY (`group`) REFERENCES `fin_operations_groups` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_payment` FOREIGN KEY (`payment`) REFERENCES `fin_operations_payments` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_side` FOREIGN KEY (`side`) REFERENCES `fin_operations_sides` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_owner` FOREIGN KEY (`user_owner`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
