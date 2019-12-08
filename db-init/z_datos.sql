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
                           VALUES  (100,      '3123154645646',    '20303332805', '00002132132132', 'AR-000111', 'Leche Nutrilon'  );

INSERT INTO `db_elaiss`.`producto` (cantDisp, codbar, codOrigen, GTIN,  nSerie, nombre)
                           VALUES  (100,      '9993154645646',    '70302552365', '00002132132132', 'AR-003191', 'Pastillas Anticonceptivas'  );


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
    'Perez',
    '2019-12-12 00:00:00',
    '99999999,
    '2019-12-12 00:00:00',
    'Juan',
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
    'Doe',
    '00000000',
    '2019-11-23 00:00:00',
    'Jhon',
    '5491140716602'
  );


INSERT INTO `db_elaiss`.`autorizados` (
    apellido,
    DNI,
    fh_alta,
    nombre,
    telefono
  )
VALUES
  (
    'AutorizadoDemo2',
    '00000004',
    '2019-11-23 00:00:00',
    'AutorizadoDemo2',
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

  INSERT INTO `db_elaiss`.`beneficiario_autorizado` (
    id_autorizado,
    id_beneficiario
  )
VALUES
  (
    2,
    1
  );