import { User } from "../../models/user.model"
import { Request, Response } from 'express';

export const getUser = async(req: Request, res: Response) => {
    try {
        const userData = await User.find({});
        res.send(userData).status(200)
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}