import {Router} from "express";
import {register, login, logout, profile} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { verifyToken } from "../controllers/auth.controller.js";
const router = Router()

router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema), login)
router.post("/logout", logout)
router.get("/verify", verifyToken) //esto lo llamamos en authController.js
router.get("/profile", authRequired, profile)

export default router;