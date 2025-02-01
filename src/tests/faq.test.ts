import request from 'supertest';
import app from '../app';
import Faq from '../models/Faq';
import { redisClient } from '../config/redisDb';
import { jest } from '@jest/globals';
import { NextFunction } from 'express';

jest.mock('../models/Faq');
jest.mock('../config/redisDb');
jest.mock("../middlewares/authMiddleware", () => (req: Request, res: Response, next: NextFunction) => next());


describe('FAQ API Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('GET /faqs', () => {
        it('should return FAQs successfully', async () => {
            const mockFaqs = [
                {
                    _id: '1',
                    getTranslated: jest.fn().mockReturnValue({ question: 'What is this?', answer: 'This is a test FAQ.' })
                },
                {
                    _id: '2',
                    getTranslated: jest.fn().mockReturnValue({ question: 'How does it work?', answer: 'It works by testing.' })
                }
            ];

            jest.spyOn(Faq, 'find').mockResolvedValue(mockFaqs);
            jest.spyOn(redisClient, 'setEx').mockResolvedValue('OK');

            const response = await request(app).get('/api/faq?lang=en');

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0]).toHaveProperty('question', 'What is this?');
            expect(response.body[1]).toHaveProperty('answer', 'It works by testing.');
        });

        it('should return 500 if an error occurs', async () => {
            jest.spyOn(Faq, 'find').mockRejectedValue(new Error('DB Error'));

            const response = await request(app).get('/api/faq');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Server error');
        });
    });

    describe('POST /faqs', () => {
        it('should create a new FAQ successfully', async () => {
            const mockFaq = {
                _id: '123',
                question: 'New question?',
                answer: 'New answer.',
                question_hi: 'नया प्रश्न?',
                question_bn: 'নতুন প্রশ্ন?'
            };

            jest.spyOn(Faq.prototype, 'save').mockResolvedValue(mockFaq);

            const response = await request(app)
                .post('/api/faq')
                .send({
                    question: 'New question?',
                    answer: 'New answer.'
                });

            expect(response.status).toBe(201);
        });

        it('should return 500 if creating FAQ fails', async () => {
            jest.spyOn(Faq.prototype, 'save').mockRejectedValue(new Error('DB Error'));

            const response = await request(app)
                .post('/api/faq')
                .send({ question: 'New question?', answer: 'New answer.' });

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Failed to create FAQ');
        });
    });
});
