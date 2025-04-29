import { Request, Response } from 'express';
import { Req } from '../../models/request.model';

export const addFriend = async(req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    try {
        if(senderId === receiverId) {
            res.send("No").status(401);
            return;
        }
        const existingRequest = await Req.findOne({
            $or: [
              { senderId, receiverId },
              { senderId: receiverId, receiverId: senderId }
            ]
          });
        if (existingRequest) {
            res.status(409).send("Friend request already sent.");
            return;
        }
        await Req.create({
            senderId: senderId,
            receiverId: receiverId
        })
        res.send("Request sent").status(201);
    } catch (error) {
        res.send("Failed to send friend request").status(400)
        console.log("Error occured ", error);
    }
}