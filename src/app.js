import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";

const app = express();
//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser()); // 👈 habilita req.cookies
//Routes
app.use("/api",authRoutes);
app.use("/api",userRoutes);

export default app;