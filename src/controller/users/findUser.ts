import { User } from "../../models/user.model";
import { Request, Response } from 'express';

export const findUser = async (req: Request, res: Response) => {
    const { username } = req.params;

    try {
        const users = await User.findOne({username: username});
        console.log(users);
        
        if (!users) {
             res.status(404).send({ message: 'User not found' });
             return;
        }
        res.status(200).send(users);
    } catch (error) {
        console.log("Error occurred ", error);
        res.status(400).send({ message: 'Failed to get user' });
    }
}
