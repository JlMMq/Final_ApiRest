import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as clienteController} from "./../controllers/cliente";

const router = Router();

router.post("/api/cliente",clienteController.insertCliente);
router.get("/api/cliente", clienteController.getCliente);
router.put("/api/cliente", clienteController.updateCliente);
router.delete("/api/cliente", clienteController.deleteCliente);

export default router;