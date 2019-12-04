INSERT INTO `db_elaiss`.`usuarios` (
    Apellido,
    DNI,
    fh_alta,
    idCentro,
 
    mail,
    Nombre,
    pass,
    usuario
  )
VALUES
  (
    'root',
    '00000000',
    '2019-12-12 00:00:00',
    1,
    'gscigliotto@gmail.com',
    'Admin',
    '$2b$04$GUm9gmkigrX7ThLym6UolO6734pOxONyLQ9BuWA5rpUUmBpBnwBjy',
    'admin'
  );


INSERT INTO `usuario_roles` ( `idUsuario`, `idRol`) VALUES ( 1, 4);

INSERT INTO `db_elaiss`.`producto` (cantDisp, codbar, codOrigen, GTIN,  nSerie, nombre)
                           VALUES  (100,      '3123154645646',    '20303332805', '00002132132132',        'AR-000111', 'Leche Nutrilon de 0 a 3'  );


INSERT INTO `db_elaiss`.`beneficiarios` (
    apellido,
    data_created,
    DNI,
    fechaNac,
    nombre,
    telefono
  )
VALUES
  (
    'ApellidobeneficiarioDemo',
    '2019-12-12 00:00:00',
    '00000000',
    '2019-12-12 00:00:00',
    'Nombrebeneficiariodemo',
    '5491140716602'
  );


INSERT INTO `orden` (`DescTratamiento`, `estado`, `fechaFin`, 
                       `fechaInicio`, `idBeneficiario`, `idCentro`, 
                       `idproducto`, `idUsuarioAlta`, `idUsuarioMedico`, 
                       `observaciones`, `tipo`) VALUES 
                       ('Tratamiento demo', 'I',  '2019-12-31 00:00:00',
                       '2019-11-01 00:00:00',1,1,
                       1,1,1,
                       'Orden de prueba observacion','0');
                       
INSERT INTO `db_elaiss`.`entregas` ( estadoEntrega, fechaEntrega, idOrden, idproducto,cantidad  )
                        VALUES
                        ( 'P', '2019-11-23 00:00:00', 1, 1,3 );


INSERT INTO `db_elaiss`.`autorizados` (
    apellido,
    DNI,
    fh_alta,
    nombre,
    telefono
  )
VALUES
  (
    'ApellidoAutorizadoDemo',
    '00000000',
    '2019-11-23 00:00:00',
    'NombreAutorizado',
    '5491140716602'
  );

INSERT INTO `db_elaiss`.`beneficiario_autorizado` (
    id_autorizado,
    id_beneficiario
  )
VALUES
  (
    1,
    1
  );