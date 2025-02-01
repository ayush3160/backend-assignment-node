import express from "express";
import { login, register } from "../controllers/AuthController";
import { body } from "express-validator";

const authRouter = express.Router();

const registerValidation = [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
];

const loginValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
];

authRouter.post("/login", loginValidation, login);
authRouter.post("/register", registerValidation, register);

export default authRouter;