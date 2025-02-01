import express, { Request, Response } from "express";
import connectDB from "./config/db";
import FaqRoutes from "./routes/FaqRoutes";
import authRouter from "./routes/AuthRoutes";
import { connectRedis } from "./config/redisDb";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Databases
connectDB();
connectRedis();

// Middleware
app.use(express.json());

// Routes
app.use("/api", FaqRoutes);
app.use("/api/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
