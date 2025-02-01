import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redisDb";

const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lang = req.query.lang as string || "en";
        const cacheKey = `faqs_${lang}`;

        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            res.json(JSON.parse(cachedData));
            return;
        }

        next();
    } catch (error) {
        console.error("Redis error:", error);
        next();
    }
};

export default cacheMiddleware;