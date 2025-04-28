import { Request, Response } from 'express';
import { Req } from '../../models/request.model';

export const addFriend = async(req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    try {
        await Req.create({
            senderId: senderId,
            receiverId: receiverId
        })
        res.send("Request sent").status(201);
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}