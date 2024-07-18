import {getConnection} from "./../database/database";

/*
- ENTRADA 
    {
        "nombre": "Juan Luis Mallqui Meza",
        "correo": "juan@gmail.com",
        "telefono": "789987789",
        "direccionEnvio": "Av.La Fontana"
    }
*/
const insertCliente = async (req, res) =>{
    try{
        const { nombre, correo, telefono, direccionEnvio } = req.body;
        if(nombre === undefined || correo === undefined || telefono === undefined || direccionEnvio === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_INSERT_CLIENTE(?, ?, ?, ?)", [nombre, correo,telefono,direccionEnvio]);

        if (result.affectedRows > 0) {
            res.json({ "message": "Cliente registrado correctamente" });
        } else {
            res.status(400).json({ "message": "No se pudo registrar cliente" });
        }
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};


const getCliente = async (req, res)=>{

    try {
        const { id } = req.body;
        if(id === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query("CALL SP_GET_CLIENTE(?)",[id]);

        const clientes = result[0].map(cliente => ({
            id: cliente.int_idCliente,
            nombre: cliente.str_nombre,
            telefono: cliente.str_telefono,
            direccionEnvio: cliente.str_direccionEnvio,
            estado: cliente.bool_estado
        }));

        res.json(clientes);
    } 
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateCliente = async (req, res) =>{
    try
    {
        const {id, nombre , correo, telefono,direccionEnvio} = req.body;
        if(id === undefined || nombre === undefined || correo === undefined || telefono === undefined || direccionEnvio === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_UPDATE_CLIENTE(?, ?, ?, ?, ?)", [id, nombre, correo, telefono, direccionEnvio]);

        if (result.affectedRows > 0) {
            res.json({ "message": "Cliente actualizado correctamente" });
        } else {
            res.status(400).json({ "message": "No se pudo actualizar el cliente o no existe." });
        }
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteCliente = async (req,res) => {
    try
    {
        const {id} = req.body;
        if(id === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_DELT_CLIENTE(?)", [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ "message": "Cliente eliminada correctamente" });
        } else {
            res.status(400).json({ "message": "No se pudo eliminar el cliente o no existe." });
        }
    }
    catch(error)
    {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    insertCliente,
    getCliente,
    deleteCliente,
    updateCliente
};