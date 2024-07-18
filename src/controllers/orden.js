import {getConnection} from "./../database/database";

/*
- ENTRADA
    {
        "idCliente": 1,
        "detalle": [
            {
                "idProducto": 1, 
                "cantidad": 1
            },
            {
                "idProducto": 2, 
                "cantidad": 2
            }
        ]
    }
*/
const insertOrden = async (req, res) => {
    const connection = await getConnection();

    try {
        const { idCliente, detalle } = req.body;

        if (!idCliente || !detalle || !Array.isArray(detalle) || detalle.length === 0) {
            return res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        await connection.beginTransaction(); 

        const orderResult = await connection.query("CALL SP_INSERT_ORDEN_CAB(?)", [idCliente]);
        const { cod_err: codErrOrder, message: messageOrder, out_id: idOrden } = orderResult[0][0];

        if (codErrOrder !== 1) {
            await connection.rollback();
            return res.status(400).json({ "message": messageOrder });
        }

        for (let item of detalle) {
            const { idProducto, cantidad } = item;
            const detailResult = await connection.query("CALL SP_INSERT_ORDEN_DETLL(?, ?, ?)", [idOrden, idProducto, cantidad]);
            const { cod_err: codErrDetail, message: messageDetail } = detailResult[0][0];

            if (codErrDetail !== 1) {
                await connection.rollback();
                return res.status(400).json({ "message": messageDetail });
            }
        }

        await connection.commit(); 
        res.status(200).json({ "message": "Orden registrada correctamente." });
    } 
    catch (error) 
    {
        await connection.rollback();
        res.status(500).send(error.message);
    } 
};

const getOrden = async (req,res) => {
    try {
        const { id } = req.body;
        if(id === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }

        const connection = await getConnection();
        const resultCab = await connection.query("CALL SP_GET_ORDEN_CAB(?)",[id]);
        const resultDet = await connection.query("CALL SP_GET_ORDEN_DETLL(?)",[id]);
        
        if (resultCab[0].length === 0) {
            return res.status(404).json({ "message": "Orden no encontrada." });
        }

        const detalles = resultDet[0].map(detalle => ({
            idOrden: detalle.int_idOrden,
            idProducto: detalle.int_idProducto,
            nombre: detalle.str_nombre,
            cantidad: detalle.int_cantidad,
            precioUnitario: detalle.dou_precioUnit,
            subtotal: detalle.dou_subtotal
        }));

        const orden = resultCab[0][0];
        const ordenCompleta = {
            id: orden.int_idOrden,
            idCliente: orden.int_idCliente,
            nombreCliente: orden.str_nombre,
            total: orden.dou_total,
            idEstado: orden.int_estado,
            estado: orden.str_desestado,
            detalles: detalles
        };

        res.json(ordenCompleta);
    } 
    catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

/*
- ENTRADA
    {
        "id" : "3",
        "idEstado": "3"
    }
*/ 
const updateOrden = async (req, res) =>{
    try
    {
        const { id, idEstado } = req.body;
        if(id === undefined || idEstado === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_UPDATE_ORDEN(?, ?)", [id,idEstado]);

        if (result.length > 0) {
            const { cod_err, message } = result[0][0];
            if (cod_err === 1) {
                return res.status(200).json({ "message": message });
            } else {
                return res.status(400).json({ "message": message });
            }
        } else {
            return res.status(500).json({ "message": "Error desconocido al ejecutar el procedimiento almacenado." });
        }
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
};


const deleteOrden = async (req,res) => {
    try
    {
        const {id} = req.body;
        if(id === undefined){
            res.status(400).json({"message":"Bad Request. Please fill all fields."})
        }
        const connection = await getConnection();
        const result = await connection.query("CALL SP_DELT_ORDEN(?)", [id]);

        if (result.length > 0) {
            const { cod_err, message } = result[0][0];
            if (cod_err === 1) {
                return res.status(200).json({ "message": message });
            } else {
                return res.status(400).json({ "message": message });
            }
        } else {
            return res.status(500).json({ "message": "Error desconocido al ejecutar el procedimiento almacenado." });
        }
    }
    catch(error)
    {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    insertOrden,
    getOrden,
    updateOrden,
    deleteOrden
};