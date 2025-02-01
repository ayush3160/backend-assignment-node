import e, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { validationResult } from 'express-validator';

async function register(req: Request, res: Response) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({
            email,
        });

        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });

        const result = await user.save();

        const token = generateToken(result._id);

        res.status(201).json({ user: result, token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
}

async function login(req: Request, res: Response) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user._id);

        res.json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}

export { register, login };