import express, { Request, Response } from "express";
import FaqRoutes from "./routes/FaqRoutes";
import authRouter from "./routes/AuthRoutes";

const app = express();

app.use(express.json());

// Routes
app.use("/api", FaqRoutes);
app.use("/api/auth", authRouter);

app.get("/health", (req: Request, res: Response) => {
    res.send("Good!");
});

export default app;