import { Request, Response } from 'express';
import { Req } from '../../models/request.model';

export const declineRequest = async(req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    try {
        await Req.findOneAndDelete({senderId:senderId, receiverId:receiverId});
        res.send("Successfully declined").status(200)
    } catch (error) {
        res.send("Couldn't find the request").status(400)
        console.log("Error occured ", error);
    }
}