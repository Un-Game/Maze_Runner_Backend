import { User } from "../../models/user.model";
import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const userData = await User.findById(id).populate('friends', 'username avatar');
        if (!userData) {
             res.status(404).send({ message: 'User not found' });
             return;
        }
        res.status(200).send(userData);
    } catch (error) {
        console.log("Error occurred ", error);
        res.status(400).send({ message: 'Failed to get user' });
    }
}
