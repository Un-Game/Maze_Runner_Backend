import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';

export const checkUsernameAndEmailTaken = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email } = req.body;

    try {
        const existingUsers = await User.find({
            $or: [{ username }, { email }]
        });

        const errors: { field: string; message: string }[] = [];

        existingUsers.forEach(user => {
            if (user.username === username) {
                errors.push({ field: "username", message: "Username already taken" });
            }
            if (user.email === email) {
                errors.push({ field: "email", message: "Email already registered" });
            }
        });

        if (errors.length > 0) {
             res.status(409).json({ errors });
        }

        next();
    } catch (error) {
        console.error("Error checking username/email:", error);
        res.status(500).json({ errors: [{ field: "general", message: "Internal server error" }] });
    }
};
