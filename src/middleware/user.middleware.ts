import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

export const checkUsernameAndEmailTaken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, email } = req.body;
    const errors: { field: string; message: string }[] = [];

    try {
        const user = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (user) {
            if (user.username === username) {
                errors.push({ field: 'username', message: 'Username already taken' });
            }
            if (user.email === email) {
                errors.push({ field: 'email', message: 'Email already registered' });
            }
        }

        if (errors.length > 0) {
            res.status(409).json({ errors });
        }

        next();
    } catch (err) {
        console.error('Error checking username/email:', err);
        res.status(500).json({
            errors: [{ field: 'general', message: 'Internal server error' }],
        });
    }
};
