import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // 👈 habilita req.cookies
//Routes
app.use("/api",authRoutes);

export default app;