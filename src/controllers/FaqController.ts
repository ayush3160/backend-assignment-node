import Faq from "../models/Faq";
import { Request, Response } from "express";
import { redisClient } from "../config/redisDb";

async function getFaqs(req: Request, res: Response) {
    try {
        const lang = req.query.lang as string || "en";
        const faqs = await Faq.find();

        const translatedFaqs = faqs.map((faq) => {

            const { question, answer } = faq.getTranslated(lang);

            return {
                id: faq._id,
                question,
                answer,
            }
        });

        await redisClient.setEx(`faqs_${lang}`, 600, JSON.stringify(translatedFaqs));

        res.json(translatedFaqs);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

async function addFaq(req: Request, res: Response) {
    try {
        const { question, answer, question_hi, question_bn } = req.body;
        const newFaq = new Faq({ question, answer, question_hi, question_bn });

        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(500).json({ error: "Failed to create FAQ" });
    }
}

export { getFaqs, addFaq };