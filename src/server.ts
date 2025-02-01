import app from "./app";
import connectDB from "./config/db";
import { connectRedis } from "./config/redisDb";

// Connect Databases
connectDB();
connectRedis();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

