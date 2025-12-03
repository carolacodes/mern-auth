import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { updateUserController, deleteUserController , getUserController} from "../controllers/user.controller.js";
import {validateSchema} from "../middlewares/validateSchema.js"
import { updateUserSchema } from "../schemas/user.schema.js";
const router = Router()

router.get("/me", authRequired, getUserController)
router.put("/me", authRequired, validateSchema(updateUserSchema), updateUserController)
router.delete("/me", authRequired, deleteUserController)

export default router;