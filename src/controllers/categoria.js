import {getConnection} from "./../database/database";


const insertCategoria = async (req, res) =>{
    try{
        const { nombre, descripcion } = req.body;
        if(nombre === undefined || descripcion === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_INSERT_CATEGORIA(?, ?)", [nombre, descripcion]);

        if (result.affectedRows > 0) {
             res.json({ "message": "Categoria registrada correctamente" });
        } else {
             res.status(400).json({ "message": "No se pudo registrar la categoria" });
        }
    }
    catch(error){
         res.status(500).send(error.message);
    }
};

const listCategoria = async (req, res)=>{

    try {
        const connection = await getConnection();
        const result = await connection.query("CALL SP_LIST_CATEGORIA_ACTIVO()");

        const categoriasActivas = result[0].map(categoria => ({
            id: categoria.int_idCategoria,
            nombre: categoria.str_nombre,
            descripcion: categoria.str_descripcion
        }));

        res.json(categoriasActivas);
    } 
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getCategoria = async (req, res)=>{

    try {
        const { id } = req.body;
        if(id === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }

        const connection = await getConnection();
        const result = await connection.query("CALL SP_GET_CATEGORIA(?)",[id]);

        const categorias = result[0].map(categoria => ({
            id: categoria.int_idCategoria,
            nombre: categoria.str_nombre,
            descripcion: categoria.str_descripcion,
            estado: categoria.bool_estado
        }));

        res.json(categorias);
    } 
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateCategoria = async (req, res) =>{
    try
    {
        const {id, nombre ,descripcion} = req.body;
        if(id === undefined || nombre === undefined || descripcion === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_UPDATE_CATEGORIA(?, ?, ?)", [id, nombre, descripcion]);

        if (result.affectedRows > 0) {
            res.json({ "message": "Categoria actualizada correctamente" });
        } else {
            res.status(400).json({ "message": "No se pudo actualizar la categoria o el codigo de la categoria no existe." });
        }
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};

const deleteCategoria = async (req,res) => {
    try
    {
        const {id} = req.body;
        if(id === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_DELT_CATEGORIA(?)", [id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ "message": "Categoria eliminada correctamente" });
        } else {
            res.status(400).json({ "message": "No se pudo eliminar la categoria o el codigo de la categoria no existe." });
        }
    }
    catch(error)
    {
        res.status(500);
        res.send(error.message);
    }
}

export const methods = {
    insertCategoria,
    listCategoria,
    getCategoria,
    deleteCategoria,
    updateCategoria
};