import express, { Request, Response } from "express";
import connectDB from "./config/db";
import FaqRoutes from "./routes/FaqRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", FaqRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
