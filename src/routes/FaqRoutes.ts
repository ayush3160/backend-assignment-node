import express from "express";
import { getFaqs, addFaq } from "../controllers/FaqController";
import cacheMiddleware from "../middlewares/cacheMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const faqRouter = express.Router();

faqRouter.get("/faq", authMiddleware, cacheMiddleware, getFaqs);

faqRouter.post("/faq", authMiddleware, addFaq);

export default faqRouter;
