import { createClient } from "redis";

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || "6379"}`,
    password: process.env.REDIS_PASSWORD,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
    }
};

redisClient.on("error", (error) => {
    console.error("Redis Connection Failed:", error);
    process.exit(1);
});

export { redisClient, connectRedis };