import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const generateToken = (id: mongoose.Types.ObjectId): string => {
    return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: "7d" });
};