import express from "express"
import morgan from "morgan"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.route.js"
import cors from "cors"

const app = express()

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"].filter(Boolean)

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
)

// ✅ Express 5: usar "/*" o regex, no "*"
app.options(
    "/*",
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
)

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.get("/api/health", (req, res) => {
    res.status(200).json({ ok: true })
})

app.use("/api", authRoutes)
app.use("/api/users", userRoutes)

export default app
