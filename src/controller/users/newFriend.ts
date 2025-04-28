import { Request, Response } from "express";
import { User } from "../../models/user.model";

export const newFriend = async(req: Request, res: Response) => {
    const {senderId, receiverId } = req.body;

    try{
        await User.findOneAndUpdate({_id: receiverId}, {$addToSet: {friends:senderId}})
        await User.findOneAndUpdate({_id: senderId}, {$addToSet: {friends:receiverId}})
        res.send("Successfully added").status(201);
        
    }catch(err){
        res.send("Error adding to friend list").status(400);
    }
}