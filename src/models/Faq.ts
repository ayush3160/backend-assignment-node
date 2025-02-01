import mongoose, { Document, Schema } from "mongoose";
import translateText from "../utils/translate";

export interface IFaq extends Document {
    question: string;
    answer: string;
    translations: Translations;
    getTranslated: (lang: string) => TranslationResponse;
}

export interface Translations {
    hi: {
        question: string;
        answer: string;
    };
    bn: {
        question: string;
        answer: string;
    };
}

export type TranslationResponse = {
    question: string;
    answer: string;
}

const FaqSchema = new Schema<IFaq>(
    {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        translations: {
            hi: {
                question: { type: String },
                answer: { type: String },
            },
            bn: {
                question: { type: String },
                answer: { type: String },
            },
        }
    },
    { timestamps: true }
);

FaqSchema.methods.getTranslated = function (lang: string): TranslationResponse {
    return this.translations[lang as keyof Translations] || { question: this.question, answer: this.answer };
};

FaqSchema.pre<IFaq>("save", async function (next) {
    try {

        const hindiTranslated = await translateText(this.question, this.answer, "hi");
        const bengaliTranslated = await translateText(this.question, this.answer, "bn");

        this.translations = {
            hi: hindiTranslated,
            bn: bengaliTranslated,
        };

        next();
    } catch (error) {
        console.error("Translation failed", error);
        next(error as mongoose.CallbackError);
    }
});

const Faq = mongoose.model<IFaq>("Faq", FaqSchema);
export default Faq;
