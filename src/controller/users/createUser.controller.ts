import { Request, Response } from 'express';
import bcrypt from "bcrypt"
import { User } from '../../models/user.model';

export const createUser = async(req: Request, res: Response) => {
    const {email, password, username } = req.body;
    const saltRounds = 8;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        await User.create({
            email: email,
            password: hashedPassword,
            username: username
        })
        res.send("User created").status(201)
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}