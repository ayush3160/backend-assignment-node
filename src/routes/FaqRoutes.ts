import express from "express";
import { getFaqs, addFaq } from "../controllers/FaqController";
import cacheMiddleware from "../middlewares/cacheMiddleware";

const faqRouter = express.Router();

faqRouter.get("/faq", cacheMiddleware, getFaqs);

faqRouter.post("/faq", addFaq);

export default faqRouter;
