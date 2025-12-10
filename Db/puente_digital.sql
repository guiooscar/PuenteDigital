-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-12-2025 a las 00:12:58
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `puente_digital`
--

-- --------------------------------------------------------

--
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

--
-- Volcado de datos para la tabla `activities`
--

INSERT INTO `activities` (`id_activity`, `id_module`, `title_activity`, `type_activity`, `content_activity`, `order_activity`, `created_at`, `updated_at`) VALUES
(1, 1, '¿Qué es un dispositivo digital?', 'video', 'Video introductorio sobre tipos de dispositivos digitales.', 1, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(2, 1, 'Identifica los componentes del computador', 'exercise', 'Ejercicio práctico para reconocer partes del equipo.', 2, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(3, 1, 'Quiz: Conceptos básicos digitales', 'quiz', 'Cuestionario de 8 preguntas sobre alfabetización digital.', 3, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(4, 2, 'Cómo usar un navegador web', 'video', 'Explicación sobre Chrome, Firefox y navegación segura.', 1, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(5, 2, 'Crear tu primer correo electrónico', 'exercise', 'Guía paso a paso para crear una cuenta de correo.', 2, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(6, 2, 'Quiz: Navegación e Internet', 'quiz', 'Evaluación básica del uso de Internet.', 3, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(7, 3, 'Uso intermedio de Word', 'video', 'Video sobre edición de documentos, estilos y tablas.', 1, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(8, 3, 'Ejercicio práctico: Crear un documento', 'exercise', 'Actividad para aplicar herramientas de formato.', 2, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(9, 3, 'Quiz: Ofimática inicial', 'quiz', 'Preguntas sobre Word, Excel y PowerPoint.', 3, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(10, 4, 'Buenas prácticas de seguridad digital', 'video', 'Video sobre contraseñas seguras y protección de datos.', 1, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(11, 4, 'Ejercicio: Identificar correos sospechosos', 'exercise', 'Actividad para reconocer phishing.', 2, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(12, 4, 'Quiz: Seguridad y comunicación', 'quiz', 'Evaluación sobre seguridad digital.', 3, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(13, 5, 'Introducción a herramientas de productividad', 'video', 'Explicación de Google Drive, Docs y Sheets.', 1, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(14, 5, 'Ejercicio: Crear carpeta en la nube', 'exercise', 'Paso a paso en Google Drive.', 2, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(15, 5, 'Quiz: Productividad digital', 'quiz', 'Evaluación rápida del módulo.', 3, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(16, 6, 'Transformación digital: Conceptos clave', 'video', 'Video explicando procesos digitales en empresas.', 1, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(17, 6, 'Ejercicio: Identificar herramientas digitales', 'exercise', 'Actividad aplicada a escenarios reales.', 2, '2025-12-10 22:43:13', '2025-12-10 22:43:13'),
(18, 6, 'Quiz: Transformación digital', 'quiz', 'Preguntas de nivel funcional para medir comprensión.', 3, '2025-12-10 22:43:13', '2025-12-10 22:43:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `certificates`
--

CREATE TABLE `certificates` (
  `id_certificate` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_module` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `certificates`
--

INSERT INTO `certificates` (`id_certificate`, `id_user`, `id_module`, `created_at`) VALUES
(1, 1, 1, '2025-11-15 15:30:00'),
(2, 1, 2, '2025-11-20 19:45:00'),
(3, 1, 3, '2025-12-05 14:15:00'),
(4, 2, 1, '2025-11-18 16:00:00'),
(5, 2, 2, '2025-12-01 21:30:00'),
(6, 3, 1, '2025-12-08 18:20:00'),
(7, 4, 1, '2025-10-10 13:00:00'),
(8, 4, 2, '2025-10-25 15:30:00'),
(9, 4, 3, '2025-11-10 20:45:00'),
(10, 5, 1, '2025-12-08 23:11:35'),
(11, 5, 2, '2025-12-09 23:11:35'),
(12, 6, 1, '2025-12-10 23:11:35');

-- --------------------------------------------------------

--
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

--
-- Volcado de datos para la tabla `modules`
--

INSERT INTO `modules` (`id_module`, `title_module`, `description_module`, `level_module`, `order_module`, `created_at`, `updated_at`) VALUES
(1, 'Introducción a la Alfabetización Digital', 'En este módulo el usuario aprenderá los conceptos básicos del entorno digital, dispositivos tecnológicos y uso inicial del computador.', 'basico', 1, '2025-12-10 22:38:35', '2025-12-10 22:38:35'),
(2, 'Navegación en Internet y Manejo de Herramientas', 'Explicación de navegadores, buscadores, cuentas de correo y herramientas esenciales para el entorno digital cotidiano.', 'basico', 2, '2025-12-10 22:38:35', '2025-12-10 22:38:35'),
(3, 'Uso de Herramientas Ofimáticas', 'El usuario aprenderá a manejar Word, Excel y PowerPoint desde un nivel intermedio, aplicando ejercicios prácticos.', 'intermedio', 3, '2025-12-10 22:38:35', '2025-12-10 22:38:35'),
(4, 'Comunicación y Seguridad Digital', 'Técnicas de comunicación efectiva en entornos digitales, gestión de cuentas y principios de ciberseguridad personal.', 'intermedio', 4, '2025-12-10 22:38:35', '2025-12-10 22:38:35'),
(5, 'Productividad Digital Aplicada', 'Módulo orientado a potenciar la productividad mediante herramientas de colaboración digital, almacenamiento en la nube y gestión de proyectos.', 'funcional', 5, '2025-12-10 22:38:35', '2025-12-10 22:38:35'),
(6, 'Transformación Digital y Uso Funcional de Tecnologías', 'Aplicación avanzada de tecnologías digitales para mejorar procesos laborales, emprendimientos y toma de decisiones.', 'funcional', 6, '2025-12-10 22:38:35', '2025-12-10 22:38:35');

-- --------------------------------------------------------

--
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

--
-- Volcado de datos para la tabla `progress`
--

INSERT INTO `progress` (`id_progress`, `id_user`, `id_activity`, `completed`, `score`, `attempts`, `last_attempt_date`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 8.50, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(2, 2, 1, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(3, 3, 1, 1, 9.20, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(4, 4, 1, 1, 7.80, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(5, 5, 1, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(6, 6, 1, 1, 6.40, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(7, 7, 1, 0, 0.00, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(8, 8, 1, 1, 9.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(9, 9, 1, 1, 7.50, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(10, 10, 1, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(11, 11, 1, 1, 8.90, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(12, 12, 1, 1, 9.70, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(13, 13, 1, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(14, 14, 1, 1, 6.80, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(15, 15, 1, 1, 9.10, 3, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(16, 16, 1, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(17, 17, 1, 1, 8.10, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(18, 18, 1, 0, 0.00, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(19, 19, 1, 1, 9.40, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(20, 20, 1, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(21, 1, 2, 1, 9.10, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(22, 2, 2, 1, 7.40, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(23, 3, 2, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(24, 4, 2, 1, 9.50, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(25, 5, 2, 1, 8.20, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(26, 6, 2, 0, 0.00, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(27, 7, 2, 1, 6.90, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(28, 8, 2, 1, 8.70, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(29, 9, 2, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(30, 10, 2, 1, 7.60, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(31, 11, 2, 1, 9.80, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(32, 12, 2, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(33, 13, 2, 1, 7.10, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(34, 14, 2, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(35, 15, 2, 1, 8.60, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(36, 16, 2, 1, 9.20, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(37, 17, 2, 0, 0.00, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(38, 18, 2, 1, 7.80, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(39, 19, 2, 1, 9.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(40, 20, 2, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(41, 1, 3, 1, 8.30, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(42, 2, 3, 1, 9.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(43, 3, 3, 1, 7.60, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(44, 4, 3, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(45, 5, 3, 1, 6.90, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(46, 6, 3, 1, 8.50, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(47, 7, 3, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(48, 8, 3, 1, 9.40, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(49, 9, 3, 1, 7.30, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(50, 10, 3, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(51, 11, 3, 1, 9.20, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(52, 12, 3, 1, 8.80, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(53, 13, 3, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(54, 14, 3, 1, 9.10, 2, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(55, 15, 3, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(56, 16, 3, 1, 7.70, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(57, 17, 3, 1, 8.20, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(58, 18, 3, 0, 0.00, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(59, 19, 3, 1, 9.50, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07'),
(60, 20, 3, 1, 7.90, 1, '2025-12-10 23:03:07', '2025-12-10 23:03:07', '2025-12-10 23:03:07');

-- --------------------------------------------------------

--
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

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `name_user`, `email_user`, `password_user`, `level_user`, `created_at`, `updated_at`) VALUES
(1, 'Carlos Mendoza', 'carlos@test.com', 'clave123', 'basico', '2025-12-10 18:40:41', '2025-12-10 22:37:19'),
(2, 'Ana Martínez', 'ana.martinez@example.com', 'clave123', 'basico', '2025-12-10 18:43:27', '2025-12-10 18:43:27'),
(3, 'Carlos Pérez', 'carlos.perez@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(4, 'María Rodríguez', 'maria.rodriguez@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(5, 'Juan López', 'juan.lopez@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(6, 'Ana Castillo', 'ana.castillo@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(7, 'Pedro Martínez', 'pedro.martinez@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(8, 'Luisa Hernández', 'luisa.hernandez@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(9, 'Sofía Morales', 'sofia.morales@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(10, 'Daniel Torres', 'daniel.torres@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(11, 'Laura García', 'laura.garcia@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(12, 'Miguel Vargas', 'miguel.vargas@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(13, 'Juliana Ramírez', 'juliana.ramirez@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(14, 'Felipe Navarro', 'felipe.navarro@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(15, 'Paola Mendoza', 'paola.mendoza@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(16, 'David Jiménez', 'david.jimenez@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(17, 'Valentina Silva', 'valentina.silva@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(18, 'Andrés Rojas', 'andres.rojas@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(19, 'Camila Pineda', 'camila.pineda@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(20, 'Jorge Cárdenas', 'jorge.cardenas@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(21, 'Natalia Herrera', 'natalia.herrera@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01'),
(22, 'Sebastián Duarte', 'sebastian.duarte@example.com', 'Pass123', 'basico', '2025-12-10 22:37:01', '2025-12-10 22:37:01');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id_activity`),
  ADD KEY `FK_8c150e6989957e6e71d1c54a2e1` (`id_module`);

--
-- Indices de la tabla `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id_certificate`),
  ADD KEY `FK_52c01b57846b5a2e649f91d0538` (`id_user`),
  ADD KEY `FK_6d668689e6c3f58aa762ec99155` (`id_module`);

--
-- Indices de la tabla `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id_module`);

--
-- Indices de la tabla `progress`
--
ALTER TABLE `progress`
  ADD PRIMARY KEY (`id_progress`),
  ADD KEY `FK_f8de1b451294384dbb720eb2cf6` (`id_user`),
  ADD KEY `FK_55d50325cb478b815339c856f10` (`id_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `IDX_6a96700476ddd642b04e29c85f` (`email_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activities`
--
ALTER TABLE `activities`
  MODIFY `id_activity` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id_certificate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `modules`
--
ALTER TABLE `modules`
  MODIFY `id_module` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `progress`
--
ALTER TABLE `progress`
  MODIFY `id_progress` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `FK_8c150e6989957e6e71d1c54a2e1` FOREIGN KEY (`id_module`) REFERENCES `modules` (`id_module`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `certificates`
--
ALTER TABLE `certificates`
  ADD CONSTRAINT `FK_52c01b57846b5a2e649f91d0538` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6d668689e6c3f58aa762ec99155` FOREIGN KEY (`id_module`) REFERENCES `modules` (`id_module`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `FK_55d50325cb478b815339c856f10` FOREIGN KEY (`id_activity`) REFERENCES `activities` (`id_activity`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f8de1b451294384dbb720eb2cf6` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
