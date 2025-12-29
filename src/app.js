import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import cors from "cors";

const app = express();
//CORS
app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"].filter(Boolean), //origin: 'http://localhost:5173', // Reemplaza con el origen de tu frontend
    credentials: true // Habilita el envío de cookies
}))
//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // 👈 habilita req.cookies

// ✅ Health check (antes de rutas)
app.get("/api/health", (req, res) => {
    res.status(200).json({
        ok: true,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    })
})

//Routes
app.use("/api",authRoutes);
app.use("/api/users",userRoutes);

export default app;