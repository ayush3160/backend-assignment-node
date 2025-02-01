import translate from "google-translate-api-x";
import { TranslationResponse } from "../models/Faq";

export default async function translateText(question: string, answer: string, lang: string): Promise<TranslationResponse> {
    try {
        const translatedQuestion = await translate(question, { to: lang });
        const translatedAnswer = await translate(answer, { to: lang });

        return { question: translatedQuestion.text, answer: translatedAnswer.text };
    } catch (error) {
        console.error("Translation failed", error);
        return { question, answer };
    }
}