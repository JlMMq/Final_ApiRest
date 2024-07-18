import {getConnection} from "./../database/database"
import {Router} from "express"
import {methods as ordenController} from "./../controllers/orden";

const router = Router();

router.post("/api/orden",ordenController.insertOrden);
router.get("/api/orden",ordenController.getOrden);
router.put("/api/orden",ordenController.updateOrden);
router.delete("/api/orden",ordenController.deleteOrden);
export default router;