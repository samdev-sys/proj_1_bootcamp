-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 19-06-2025 a las 06:33:38
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
-- Base de datos: `001_app`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coments`
--

CREATE TABLE `coments` (
  `id` int(11) NOT NULL,
  `asunto` varchar(100) NOT NULL,
  `archivos cargados` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `contacto` varchar(50) NOT NULL,
  `fecha creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id_contacto` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `datos` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacts`
--

INSERT INTO `contacts` (`id_contacto`, `nombre`, `foto`, `datos`) VALUES
(1, 'david', '/vistas/1.jpg', 'commit');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tasks`
--

CREATE TABLE `tasks` (
  `id_tarea` int(11) NOT NULL,
  `user` varchar(15) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `store_URL` varchar(500) NOT NULL,
  `tipo_archivo` varchar(50) NOT NULL,
  `fecha_de_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Estado` enum('por iniciar','En proceso','Finalizado','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tasks`
--

INSERT INTO `tasks` (`id_tarea`, `user`, `asunto`, `descripcion`, `store_URL`, `tipo_archivo`, `fecha_de_creacion`, `Estado`) VALUES
(1, 'sam', 'revisar webApps', 'revisar frontend webApp', 'www.google.com', 'dax.txt', '2025-06-05 05:19:53', 'En proceso'),
(2, 'dav', 'revisar backend', 'revisar frontend webApp', 'www.google.com', 'suv.txt', '0000-00-00 00:00:00', ''),
(6, 'MARK', 'revisar webApps py', 'revisar frontend webApp Python', 'www.google.com', 'dax.txt', '0000-00-00 00:00:00', 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `usuario` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `pregunta` text NOT NULL,
  `respuesta` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `usuario`, `email`, `password`, `pregunta`, `respuesta`) VALUES
(1, 'samuel ', 'SAM4432', 'sv4432@gmail.com', 'sv4432', '¿nombre de  madre?', 'lili'),
(2, 'Juan', 'jdoe', 'juan@example.com', '123456', '¿Tu color favorito?', 'Negro'),
(4, 'Joan', 'jsie', 'mn@example.com', '123456', '¿Tu color favorito?', 'negro');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `coments`
--
ALTER TABLE `coments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id_contacto`);

--
-- Indices de la tabla `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id_tarea`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `coments`
--
ALTER TABLE `coments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contactos_users_FK` FOREIGN KEY (`id_contacto`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
