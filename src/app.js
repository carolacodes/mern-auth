import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";

const app = express();
//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api",authRoutes);

export default app;