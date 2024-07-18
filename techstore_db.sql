CREATE DATABASE techstore_db;

USE techstore_db;
CREATE TABLE IF NOT EXISTS tb_Categorias(
	int_idCategoria int NOT NULL AUTO_INCREMENT,
    str_nombre varchar(50) NOT NULL,
    str_descripcion varchar(100) NULL,
    bool_estado boolean NOT NULL DEFAULT 1,
    primary key (int_idCategoria)
)AUTO_INCREMENT = 1;


CREATE TABLE IF NOT EXISTS tb_Productos (
	int_idProducto int NOT NULL AUTO_INCREMENT,
    str_nombre varchar(50) NOT NULL,
    str_descripcion varchar(100) NULL,
    dou_precio float NULL,
    int_stock int NULL,
    int_idCategoria int NOT NULL,
    bool_estado boolean NOT NULL DEFAULT 1,
    PRIMARY KEY (int_idProducto),
	CONSTRAINT fk_categoria FOREIGN KEY (int_idCategoria) REFERENCES tb_Categorias(int_idCategoria)
)AUTO_INCREMENT=1; 

CREATE TABLE IF NOT EXISTS tb_Clientes(
	int_idCliente int NOT NULL AUTO_INCREMENT,
    str_nombre varchar(75) NOT NULL,
    str_correo varchar(100) NULL,
    str_telefono varchar(9) NULL,
    str_direccionEnvio varchar(150) NULL,
    bool_estado boolean NOT NULL DEFAULT 1,
    primary key (int_idCliente)
)AUTO_INCREMENT = 1;

CREATE TABLE IF NOT EXISTS tb_Ordenes(
	int_idOrden int NOT NULL auto_increment,
    int_idCliente int NOT NULL,
    dou_total float NOT NULL DEFAULT 0,
	int_estado int NOT NULL DEFAULT 0,
    str_desestado varchar(20) NULL,
	PRIMARY KEY (int_idOrden),
    CONSTRAINT fk_cliente FOREIGN KEY (int_idCliente) REFERENCES tb_Clientes(int_idCliente)
)AUTO_INCREMENT = 1;

-- int_estado : str_desestado
-- 0 : PENDIENTE
-- 1 : ENVIADO
-- 2 : ENTREGADO
-- 3 : CANCELADO
-- 4 : ERRONEA

CREATE TABLE IF NOT EXISTS tb_Ordenes_Detalle (
    int_idOrden INT NOT NULL,
    int_idProducto INT NOT NULL,
    int_cantidad INT NULL DEFAULT 0,
    dou_precioUnit float null DEFAULT 0,
    dou_subtotal float null DEFAULT 0,
    PRIMARY KEY (int_idOrden, int_idProducto),
    CONSTRAINT fk_orden FOREIGN KEY (int_idOrden) REFERENCES tb_Ordenes(int_idOrden),
    CONSTRAINT fk_producto FOREIGN KEY (int_idProducto) REFERENCES tb_Productos(int_idProducto)
);

-- CATEGORIA
DELIMITER $$
CREATE PROCEDURE SP_INSERT_CATEGORIA(in nombre varchar(50), in descripcion varchar(100))
BEGIN 
	INSERT INTO tb_Categorias(str_nombre,str_descripcion) VALUES (nombre,descripcion);
END $$
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE SP_LIST_CATEGORIA_ACTIVO()
BEGIN
	SELECT int_idCategoria, str_nombre, str_descripcion FROM tb_categorias WHERE bool_estado = true;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_CATEGORIA(in id int)
BEGIN 
	SELECT int_idCategoria, str_nombre, str_descripcion , bool_estado FROM tb_categorias WHERE int_idCategoria = id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_UPDATE_CATEGORIA(in id int, in nombre varchar(50), in descripcion varchar(100))
BEGIN
        UPDATE tb_Categorias 
        SET str_nombre = nombre, 
            str_descripcion = descripcion 
        WHERE int_idCategoria = id;   
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_DELT_CATEGORIA(in id int)
BEGIN
	DELETE FROM tb_Categorias WHERE int_idCategoria = id;
END $$
DELIMITER ;

-- PRODUCTO
DELIMITER $$
CREATE PROCEDURE SP_INSERT_PRODUCTO(in nombre varchar(50), in descripcion varchar(100), in precio float, in stock int, in categoria int)
BEGIN
	declare categoria_exist int default 0;
	declare cod_err int default 0;
    declare message varchar(500);
    DECLARE rows_affected INT;
    
    set message = "El producto no se pudo registrar.";
    
    SELECT 1 INTO categoria_exist  FROM tb_Categorias WHERE int_idCategoria = categoria limit 1;
    IF categoria_exist = 1  THEN
		INSERT INTO tb_Productos (str_nombre, str_descripcion, dou_precio, int_stock, int_idCategoria)
        VALUES (nombre,descripcion,precio,stock,categoria);
        SET rows_affected = ROW_COUNT();
        IF rows_affected > 0 THEN
			set cod_err = 1;
			set message = "Producto registrado correctamente."; 
		ELSE
			set cod_err = -1;
			set message = "No se pudo registrar el producto.";
		END IF;
    ELSE
		set cod_err = -1;
		set message = "La categoria que se quiere asociar al producto no existe.";
    END IF;
    
    SELECT cod_err , message ;
END $$	
DELIMITER ;

DELIMITER $$ 
CREATE PROCEDURE SP_LIST_PRODUCTO_ACTIVO()
BEGIN
	SELECT p.int_idProducto, p.str_nombre, p.str_descripcion, p.dou_precio, p.int_stock, p.int_idCategoria , c.str_nombre as str_nombreCategoria 
    FROM tb_productos p  
    INNER JOIN tb_categorias c on  p.int_idCategoria = c.int_idCategoria WHERE p.bool_estado = true;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_PRODUCTO(in id int)
BEGIN 
	SELECT p.int_idProducto, p.str_nombre, p.str_descripcion, p.dou_precio, p.int_stock, p.int_idCategoria , c.str_nombre as str_nombreCategoria, p.bool_estado 
    FROM tb_productos p  
    INNER JOIN tb_categorias c on  p.int_idCategoria = c.int_idCategoria WHERE p.int_idProducto = id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_UPDATE_PRODUCTO(in id int,in nombre varchar(50), in descripcion varchar(100), in precio float, in stock int, in categoria int)
BEGIN
	declare categoria_exist int default 0;
	declare cod_err int default 0;
    declare message varchar(500);
    DECLARE rows_affected INT;
    
    set message = "El producto no se pudo actualizar.";
    
    SELECT 1 INTO categoria_exist  FROM tb_Categorias WHERE int_idCategoria = categoria limit 1;
    IF categoria_exist = 1  THEN
		UPDATE tb_productos
        SET str_nombre = nombre,
			str_descripcion = descripcion,
            dou_precio = precio,
            int_stock = stock,
            int_idCategoria = categoria
        WHERE int_idProducto = id;
        
        SET rows_affected = ROW_COUNT();
        IF rows_affected > 0 THEN
			set cod_err = 1;
			set message = "Producto atualizado correctamente."; 
		ELSE
			set cod_err = -1;
			set message = "No se pudo actualizar el producto.";
		END IF;
    ELSE
		set cod_err = -1;
		set message = "La categoria que se quiere asociar al producto no existe.";
    END IF;
    
    SELECT cod_err , message ;
END $$	
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_DELT_PRODUCTO(in id int)
BEGIN
	DELETE FROM tb_Productos WHERE int_idProducto = id;
END $$
DELIMITER ;

-- CLIENTE
DELIMITER $$
CREATE PROCEDURE SP_INSERT_CLIENTE(in nombre varchar(75), in correo varchar(100), in telefono varchar(9), in direccionEnvio varchar(150))
BEGIN
	INSERT INTO tb_Clientes(str_nombre,str_correo,str_telefono,str_direccionEnvio) values (nombre,correo,telefono,direccionEnvio);
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_CLIENTE(in id int)
BEGIN 
	SELECT int_idCliente, str_nombre, str_correo,str_telefono,str_direccionEnvio, bool_estado FROM tb_Clientes WHERE int_idCliente = id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_UPDATE_CLIENTE(in id int, in nombre varchar(75), in correo varchar(100), in telefono varchar(9), in direccionEnvio varchar(150))
BEGIN
        UPDATE tb_Clientes 
        SET str_nombre = nombre, 
            str_correo = correo,
            str_telefono = telefono,
            str_direccionEnvio = direccionEnvio
        WHERE int_idCliente= id;   
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_DELT_CLIENTE(in id int)
BEGIN
	DELETE FROM tb_Clientes WHERE int_idCliente = id;
END $$
DELIMITER ;

-- ORDEN
DELIMITER $$
CREATE PROCEDURE SP_INSERT_ORDEN_CAB(in idCliente int)
BEGIN
	declare cliente_exist int default 0;
	declare cod_err int default 0;
    declare message varchar(500);
    DECLARE rows_affected INT;
    DECLARE out_id INT;
	set message = "";
    
    SELECT 1 INTO cliente_exist  FROM tb_Clientes WHERE int_idCliente = idCliente limit 1;
	
    
    IF cliente_exist = 1  THEN
		INSERT INTO Tb_Ordenes (int_idCliente,str_desestado) VALUES (idCliente,"PENDIENTE");
        SET rows_affected = ROW_COUNT();
        IF rows_affected > 0 THEN
			set cod_err = 1;
			set message = "1 de 2: Se registro la orden parcialmente."; 
			set out_id = LAST_INSERT_ID(); 
        ELSE
			set cod_err = -1;
			set message = "1 de 2: No se pudo registrar la orden";
			set out_id = NULL;
		END IF;
    ELSE
		set cod_err = -1;
		set message = "1 de 2: El cliente ingresado no existe. No se pudo registrar la orden.";
		set out_id = NULL;
    END IF;
    
    SELECT cod_err , message, out_id ;
    
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_INSERT_ORDEN_DETLL(in idOrden int, in idProducto int, in cantidad int)
BEGIN
	declare producto_exist int default 0;
	declare cod_err int default 0;
    declare message varchar(500);
    DECLARE rows_affected INT;
    
    declare precioUnit float default 0;
    declare stock int default 0;
    declare subtotal float default 0;
    
	set message = "";
    
    SELECT 1 INTO producto_exist  FROM tb_Productos WHERE int_idProducto = idProducto limit 1;
    IF producto_exist = 1  THEN
		SELECT dou_precio, int_stock INTO precioUnit, stock  FROM tb_Productos WHERE int_idProducto = idProducto limit 1;
        IF stock >= cantidad THEN
			set subtotal = cantidad * precioUnit;
            INSERT INTO tb_Ordenes_Detalle (int_idOrden, int_idProducto, int_cantidad, dou_precioUnit,dou_subtotal)
            VALUES (idOrden,idProducto,cantidad,precioUnit,subtotal);
            
            UPDATE tb_Ordenes
            SET dou_total = dou_total + subtotal
            WHERE int_idOrden = idOrden;
					
			SET rows_affected = ROW_COUNT();
			
			IF rows_affected > 0 THEN
				set cod_err = 1;
				set message = "2 de 2: Se registro el producto en la orden."; 
				
			ELSE
				set cod_err = -1;
				set message = "2 de 2: No se pudo registrar la orden";
			
			END IF;
        ELSE
            set cod_err = -1;
			set message = "2 de 2: No hay suficiente stock. No se pudo registrar la orden ";
        END IF;
    ELSE
		set cod_err = -1;
		set message = "2 de 2: El producto ingresado no existe. No se pudo registrar la orden.";
    END IF;
    
    SELECT cod_err , message;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_ORDEN_CAB(in id int)
BEGIN
	SELECT o.int_idOrden, o.int_idCliente, c.str_nombre,o.dou_total,o.int_estado,o.str_desestado FROM tb_Ordenes o 
    inner join tb_Clientes c ON o.int_idCliente = c.int_idCliente
    where o.int_idOrden = id;
END $$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SP_GET_ORDEN_DETLL(in id int)
BEGIN
	SELECT o.int_idOrden,o.int_idProducto,p.str_nombre,o.int_cantidad,o.dou_precioUnit,o.dou_subtotal FROM tb_Ordenes_Detalle o 
    inner join tb_Productos p on o.int_idProducto = p.int_idProducto
    where o.int_idOrden = id;
END $$
DELIMITER ;

-- int_estado : str_desestado
-- 0 : PENDIENTE
-- 1 : ENVIADO
-- 2 : ENTREGADO
-- 3 : CANCELADO
-- 4 : ERRONEA

DELIMITER $$
CREATE PROCEDURE SP_UPDATE_ORDEN(in id int, in estado int)
BEGIN
	declare flag int default 0;
    declare cod_err int default 0;
    declare message varchar(500);
    DECLARE rows_affected INT;
    
    declare new_estado varchar(20) default "";
    
    select 1 into flag from tb_Ordenes where int_idOrden = id;
    IF flag = 1  THEN
		IF estado = 0 THEN
			set new_estado = "PENDIENTE";
        ELSEIF estado = 1 THEN
            set new_estado = "ENVIADO";
        ELSEIF estado = 2 THEN
            set new_estado = "ENTREGADO";
        ELSEIF estado = 3 THEN
            set new_estado = "CANCELADO";
        ELSEIF estado = 4 THEN
            set new_estado = "ERRONEO";
        ELSE
            set cod_err = -1;
            set message = "Codigo de estado no admitido";
        END IF;
        
        IF cod_err = 0 THEN
			UPDATE tb_ordenes 
            SET int_estado = estado,
				str_desestado = new_estado
			WHERE int_idOrden = id;
			set cod_err = 1;
            set message = "La orden se actualizo correctamente.";
        END IF;
    ELSE
		set cod_err = -1;
		set message = "La orden no existe";
    END IF;
    
    SELECT cod_err , message;
END $$
DELIMITER ;

-- int_estado : str_desestado
-- 0 : PENDIENTE
-- 1 : ENVIADO
-- 2 : ENTREGADO
-- 3 : CANCELADO
-- 4 : ERRONEA
DELIMITER $$
CREATE PROCEDURE SP_DELT_ORDEN(in id int)
BEGIN
	declare flag int default 0;
    declare cod_err int default 0;
    declare message varchar(500);
    DECLARE rows_affected INT;
    
    select 1 into flag from tb_Ordenes where int_idOrden = id and int_estado in (3, 4);
    
    IF flag = 1 THEN
		DELETE FROM Tb_Ordenes_Detalle WHERE int_idOrden = id;
        DELETE FROM tb_Ordenes WHERE int_idOrden = id;
		
        SET rows_affected = ROW_COUNT();
        IF rows_affected > 0 THEN
			set cod_err = 1;
			set message = "Se elimino la orden."; 		
		ELSE
			set cod_err = -1;
			set message = "No se pudo eliminar la orden";
		END IF;
    ELSE
		set cod_err = -1;
		set message = "No se puedo eliminar la porque no esta CANCELADA 3 O ERRONEA 4. O la orden no existe.";
    END IF;
    
	SELECT cod_err , message;
END $$
DELIMITER ;