-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2019 a las 06:34:11
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_elaiss`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autorizado`
--

CREATE TABLE `autorizado` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `DNI` varchar(10) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `fh_alta` datetime NOT NULL,
  `fh_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficiario`
--

CREATE TABLE `beneficiario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `DNI` varchar(10) NOT NULL,
  `fechaNac` date NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `data_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fh_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `beneficiario_autorizado`
--

CREATE TABLE `beneficiario_autorizado` (
  `id` int(11) NOT NULL,
  `id_beneficiario` int(11) NOT NULL,
  `id_autorizado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro`
--

CREATE TABLE `centro` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `direccion` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `centro`
--

INSERT INTO `centro` (`id`, `numero`, `nombre`, `direccion`) VALUES
(1, 1, 'jacinta salud', 'yatay 240');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrega`
--

CREATE TABLE `entrega` (
  `id` int(11) NOT NULL,
  `idOrden` int(11) DEFAULT NULL,
  `idproducto` int(11) NOT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `fechaRetiro` datetime DEFAULT NULL,
  `estadoEntrga` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lote`
--

CREATE TABLE `lote` (
  `id` int(11) NOT NULL,
  `nroLote` int(11) DEFAULT NULL,
  `fh_venc` date DEFAULT NULL,
  `Producto_id` int(11) NOT NULL,
  `fh_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `id` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `mov` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id` int(11) NOT NULL,
  `idBeneficiario` int(11) NOT NULL,
  `esBeneficiario` int(1) NOT NULL,
  `idAutorizado` int(11) DEFAULT NULL,
  `fh_envio` datetime NOT NULL,
  `estado` varchar(1) NOT NULL,
  `texto` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden`
--

CREATE TABLE `orden` (
  `id` int(11) NOT NULL,
  `idUsuarioMedico` int(11) NOT NULL,
  `idCentro` int(11) NOT NULL,
  `idBeneficiario` int(11) NOT NULL,
  `idUsuarioAlta` int(11) NOT NULL,
  `idproducto` int(11) NOT NULL,
  `fechaInicio` date DEFAULT NULL,
  `fechaFin` date DEFAULT NULL,
  `DescTratamiento` varchar(45) DEFAULT NULL,
  `observaciones` varchar(4000) DEFAULT NULL,
  `estado` varchar(1) NOT NULL,
  `tipo` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `codbar` varchar(45) NOT NULL,
  `GTIN` varchar(45) DEFAULT NULL,
  `nSerie` varchar(45) DEFAULT NULL,
  `codOrigen` varchar(45) DEFAULT NULL,
  `cantDisp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `retiro`
--

CREATE TABLE `retiro` (
  `id` int(11) NOT NULL,
  `fechaRetiro` datetime DEFAULT NULL,
  `idAutorizado` int(11) DEFAULT NULL,
  `idBeneficiario` int(11) DEFAULT NULL,
  `idEntrega` int(11) NOT NULL,
  `idLote` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `Descripcion` varchar(45) NOT NULL,
  `Cod` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `Descripcion`, `Cod`) VALUES
(1, 'medico', '100'),
(2, 'administrativo', '200'),
(3, 'auditor', '300'),
(4, 'administrador', '400');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `DNI` varchar(8) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `fh_alta` datetime NOT NULL,
  `fh_baja` datetime DEFAULT NULL,
  `idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `Nombre`, `Apellido`, `DNI`, `mail`, `usuario`, `pass`, `fh_alta`, `fh_baja`, `idCentro`) VALUES
(5, 'Leandro', 'Roidzaid', '31574977', 'roidzaid@gmail.com', 'f3u2j3h', 'Lean1909', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(6, 'Debora', 'Norte', '31045562', 'debonorte@hotmail.com', 'deboNorte', '$2b$10$gEbU1xezqmQGddtmWx5FGeNm5YFkr4bq4ac94q', '2019-09-29 00:00:00', '0000-00-00 00:00:00', 1),
(13, 'Leandro1', 'Roidzaid1', '31574659', 'roidzaid1@gmail.com', 'LeanRoidzaid', '$2b$10$e4bpsz2VGL1wONXMXhCkVeex7GvQwW5.jxLgBQ', '2019-08-01 00:00:00', '2020-08-01 00:00:00', 1),
(17, 'Matias', 'Roidzaid1', '31574669', 'roidzaid3@gmail.com', 'Leandro', 'Lean1912', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(18, 'Matias', 'Roidzaid4', '31574679', 'roidzaid4@gmail.com', 'Leandro', '$2b$10$2fozgpAmEb8z2bNbrEo7BOkNCTwsznJHoW/4qU', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(19, 'Guille', 'scigli', '31574758', 'guille@gmail.com', 'guille', '$2b$10$XtIA61tHq99LNyyfN.6Lr.ZbTVQMiofy1X15xQ', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(20, 'Guille2', 'scigli3', '31543758', 'guille3@gmail.com', 'guille2', '$2b$10$ejbSoIaIjfbuUiw5b8t9pOgoJzRi2gpjDMQ2bHeqgpamh4QxbsqBy', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(21, 'Guille3', 'scigli4', '31543768', 'guille4@gmail.com', 'guille3', '$2b$10$nCp/Es3dArWfg3eEyp6rI.df9D0nTbI/u6nEtadYmCes0RzfT97le', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(22, 'Guille5', 'scigli6', '31533768', 'guille5@gmail.com', 'guille2', '$2b$04$N1Exh8nLiBVj2v2O0k8sMe2sSrvDyyp1Azb6m8JIYkTvz3xtnfRem', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(23, 'Guill65', 'scigli7', '31533748', 'guille8@gmail.com', 'guille8', '$2b$04$mYqIMcmN6H.dSCTRHSqyROd1ziPLs9npZUnMXAIuWpqA6fFjgxqlO', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(24, 'Guill35', 'sci3li7', '31533749', 'guille9@gmail.com', 'guille9', '$2b$04$MsGka8S.55D4nHCM4MlPK.MeCWh6x0Mjzn/htHHvQ5rVD8dHoOMB.', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(25, 'Guill45', 'sci34i9', '31533333', 'guille3@gmail.com', 'guille2', 'Guille1548', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(26, 'Guill85', 'sci84i9', '31533388', 'gui8883@gmail.com', 'guill10', '$2b$04$a33ABJOgwy8U1DWrO2EVTu7PmyNKAsz.HUdPdCDX8qddG81ELC/6e', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1),
(27, 'lean85', 'noert', '55555555', 'norte@gmail.com', 'lean4568', '$2b$04$7LFn3StJNVqrp/gc7XMCK.xNoQxnxwuVr9WgNo2Gx6.7rmDzl6eiS', '2019-08-01 00:00:00', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_roles`
--

CREATE TABLE `usuario_roles` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idRol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario_roles`
--

INSERT INTO `usuario_roles` (`id`, `idUsuario`, `idRol`) VALUES
(1, 24, 2),
(2, 24, 3),
(3, 24, 1),
(4, 22, 1),
(5, 22, 3),
(6, 22, 2),
(7, 26, 3),
(8, 26, 1),
(9, 26, 2),
(10, 27, 1),
(11, 27, 2),
(12, 27, 3),
(13, 27, 1),
(14, 27, 2),
(15, 27, 3),
(16, 27, 2),
(17, 27, 3),
(18, 27, 1),
(19, 27, 1),
(20, 27, 2),
(21, 27, 3),
(22, 27, 1),
(23, 27, 2),
(24, 27, 3),
(25, 27, 1),
(26, 27, 2),
(27, 27, 3),
(28, 5, 2),
(29, 5, 3),
(30, 5, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autorizado`
--
ALTER TABLE `autorizado`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `dni_UNIQUE` (`DNI`);

--
-- Indices de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `dni_UNIQUE` (`DNI`);

--
-- Indices de la tabla `beneficiario_autorizado`
--
ALTER TABLE `beneficiario_autorizado`
  ADD PRIMARY KEY (`id`,`id_beneficiario`,`id_autorizado`),
  ADD KEY `FK_BENEFICIARIO_idx` (`id_beneficiario`),
  ADD KEY `FK_AUTORIZADO_idx` (`id_autorizado`);

--
-- Indices de la tabla `centro`
--
ALTER TABLE `centro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `entrega`
--
ALTER TABLE `entrega`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `FK_ORDEN_idx` (`idOrden`);

--
-- Indices de la tabla `lote`
--
ALTER TABLE `lote`
  ADD PRIMARY KEY (`id`,`Producto_id`),
  ADD KEY `fk_Lote_Producto1_idx` (`Producto_id`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`id`,`idProducto`,`idUsuario`),
  ADD KEY `FK_PRODUCTO_MOV_idx` (`idProducto`),
  ADD KEY `FK_USUARIO_MOV_idx` (`idUsuario`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_NOT_BENE_idx` (`idBeneficiario`),
  ADD KEY `FK_NOT_AUT_idx` (`idAutorizado`);

--
-- Indices de la tabla `orden`
--
ALTER TABLE `orden`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `FK_CENTRO_idx` (`idCentro`),
  ADD KEY `FK_BENEF_idx` (`idBeneficiario`),
  ADD KEY `FK_UALTA_idx` (`idUsuarioAlta`),
  ADD KEY `FK_PRODUCTO_idx` (`idproducto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `retiro`
--
ALTER TABLE `retiro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ENTREGA_idx` (`idEntrega`),
  ADD KEY `FK_BENE_RETIRO_idx` (`idBeneficiario`),
  ADD KEY `FK_AUTO_RETIRO_idx` (`idAutorizado`),
  ADD KEY `FK_RETIRO_LOTE_idx` (`idLote`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`,`idCentro`),
  ADD UNIQUE KEY `DNI_UNIQUE` (`DNI`),
  ADD KEY `fk_Usuario_Centro1_idx` (`idCentro`);

--
-- Indices de la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD PRIMARY KEY (`id`,`idUsuario`,`idRol`),
  ADD KEY `FK_ROL_idx` (`idRol`),
  ADD KEY `FK_IDUSUARIO_idx` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autorizado`
--
ALTER TABLE `autorizado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `beneficiario`
--
ALTER TABLE `beneficiario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `beneficiario_autorizado`
--
ALTER TABLE `beneficiario_autorizado`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `centro`
--
ALTER TABLE `centro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `entrega`
--
ALTER TABLE `entrega`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `orden`
--
ALTER TABLE `orden`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `retiro`
--
ALTER TABLE `retiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `beneficiario_autorizado`
--
ALTER TABLE `beneficiario_autorizado`
  ADD CONSTRAINT `FK_AUTORIZADO` FOREIGN KEY (`id_autorizado`) REFERENCES `autorizado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_BENEFICIARIO` FOREIGN KEY (`id_beneficiario`) REFERENCES `beneficiario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `entrega`
--
ALTER TABLE `entrega`
  ADD CONSTRAINT `FK_ORDEN` FOREIGN KEY (`idOrden`) REFERENCES `orden` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `lote`
--
ALTER TABLE `lote`
  ADD CONSTRAINT `fk_Lote_Producto1` FOREIGN KEY (`Producto_id`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `FK_PRODUCTO_MOV` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_USUARIO_MOV` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `FK_NOT_AUT` FOREIGN KEY (`idAutorizado`) REFERENCES `autorizado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_NOT_BENE` FOREIGN KEY (`idBeneficiario`) REFERENCES `beneficiario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `orden`
--
ALTER TABLE `orden`
  ADD CONSTRAINT `FK_BENEF` FOREIGN KEY (`idBeneficiario`) REFERENCES `beneficiario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_CENTRO` FOREIGN KEY (`idCentro`) REFERENCES `centro` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_PRODUCTO` FOREIGN KEY (`idproducto`) REFERENCES `producto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_UALTA` FOREIGN KEY (`idUsuarioAlta`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `retiro`
--
ALTER TABLE `retiro`
  ADD CONSTRAINT `FK_AUTO_RETIRO` FOREIGN KEY (`idAutorizado`) REFERENCES `autorizado` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_BENE_RETIRO` FOREIGN KEY (`idBeneficiario`) REFERENCES `beneficiario` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ENTREGA` FOREIGN KEY (`idEntrega`) REFERENCES `entrega` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_RETIRO_LOTE` FOREIGN KEY (`idLote`) REFERENCES `lote` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_Usuario_Centro1` FOREIGN KEY (`idCentro`) REFERENCES `centro` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_roles`
--
ALTER TABLE `usuario_roles`
  ADD CONSTRAINT `FK_IDUSUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ROL` FOREIGN KEY (`idRol`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
