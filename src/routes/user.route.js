import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { updateUserController, deleteUserController , getUserController} from "../controllers/user.controller.js";
const router = Router()

router.get("/me/:id", authRequired, getUserController)
router.put("/me/:id", authRequired, updateUserController)
router.delete("/me/:id", authRequired, deleteUserController)

export default router;