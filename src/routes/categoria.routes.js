import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as categoriaController} from "./../controllers/categoria";

const router = Router();

router.post("/api/categoria",categoriaController.insertCategoria);
router.get("/api/categorias",categoriaController.listCategoria);
router.get("/api/categoria",categoriaController.getCategoria);
router.put("/api/categoria", categoriaController.updateCategoria);
router.delete("/api/categoria",categoriaController.deleteCategoria);

export default router;