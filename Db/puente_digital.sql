-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-11-2025 a las 22:03:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `puente_digital` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `puente_digital`;

-- --------------------------------------------------------
--
-- Base de datos: `puente_digital`
--

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `activities`
-- 
CREATE TABLE `activities` (
  `id_activity` int(11) NOT NULL,
  `id_module` int(11) DEFAULT NULL,
  `title_activity` varchar(255) NOT NULL,
  `type_activity` enum('video','quiz','exercise') NOT NULL,
  `content_activity` text DEFAULT NULL,
  `order_activity` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `certificates`
--
CREATE TABLE `certificates` (
  `id_certificate` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_module` int(11) DEFAULT NULL,
  `issued_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `valid_until` date DEFAULT NULL,
  `status_certificate` enum('active','expired') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `modules`
--
CREATE TABLE `modules` (
  `id_module` int(11) NOT NULL,
  `title_module` varchar(255) NOT NULL,
  `description_module` text DEFAULT NULL,
  `level_module` enum('basico','intermedio','funcional') NOT NULL,
  `order_module` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `progress`
--
CREATE TABLE `progress` (
  `id_progress` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_activity` int(11) DEFAULT NULL,
  `completed` tinyint(4) NOT NULL DEFAULT 0,
  `score` decimal(3,2) NOT NULL DEFAULT 0.00,
  `attempts` int(11) NOT NULL DEFAULT 0,
  `last_attempt_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `users`
--
CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(255) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `password_user` varchar(255) NOT NULL,
  `level_user` enum('basico','intermedio','funcional') NOT NULL DEFAULT 'basico',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índices para tablas volcadas
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id_activity`),
  ADD KEY `FK_8c150e6989957e6e71d1c54a2e1` (`id_module`);

ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id_certificate`),
  ADD KEY `FK_52c01b57846b5a2e649f91d0538` (`id_user`),
  ADD KEY `FK_6d668689e6c3f58aa762ec99155` (`id_module`);

ALTER TABLE `modules`
  ADD PRIMARY KEY (`id_module`);

ALTER TABLE `progress`
  ADD PRIMARY KEY (`id_progress`),
  ADD KEY `FK_f8de1b451294384dbb720eb2cf6` (`id_user`),
  ADD KEY `FK_55d50325cb478b815339c856f10` (`id_activity`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `IDX_6a96700476ddd642b04e29c85f` (`email_user`);

-- AUTO_INCREMENT de las tablas volcadas
ALTER TABLE `activities`
  MODIFY `id_activity` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `certificates`
  MODIFY `id_certificate` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `modules`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `progress`
  MODIFY `id_progress` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

-- Restricciones para tablas volcadas
ALTER TABLE `activities`
  ADD CONSTRAINT `FK_8c150e6989957e6e71d1c54a2e1` FOREIGN KEY (`id_module`) REFERENCES `modules` (`id_module`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `certificates`
  ADD CONSTRAINT `FK_52c01b57846b5a2e649f91d0538` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6d668689e6c3f58aa762ec99155` FOREIGN KEY (`id_module`) REFERENCES `modules` (`id_module`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `progress`
  ADD CONSTRAINT `FK_55d50325cb478b815339c856f10` FOREIGN KEY (`id_activity`) REFERENCES `activities` (`id_activity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f8de1b451294384dbb720eb2cf6` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
