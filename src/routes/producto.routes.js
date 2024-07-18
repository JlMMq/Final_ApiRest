import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as productoController} from "./../controllers/producto";

const router = Router();

router.post("/api/producto",productoController.insertProducto);
//router.get("/api/productos",productoController.listProducto);
router.get("/api/producto", productoController.getProducto);
router.put("/api/producto",productoController.updateProducto);
router.delete("/api/producto",productoController.deleteProducto);

export default router;