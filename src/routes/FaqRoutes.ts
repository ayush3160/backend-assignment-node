import express from "express";
import { getFaqs, addFaq } from "../controllers/FaqController";

const faqRouter = express.Router();

faqRouter.get("/faq", getFaqs);

faqRouter.post("/faq", addFaq);

export default faqRouter;
