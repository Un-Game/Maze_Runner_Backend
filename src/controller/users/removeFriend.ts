import { Request, Response } from "express";
import { User } from "../../models/user.model";

export const removeFriend = async (req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    try {
        await User.findOneAndUpdate({ _id: receiverId },{ $pull: { friends: senderId } });
        await User.findOneAndUpdate({ _id: senderId },{ $pull: { friends: receiverId } });

        res.status(200).send("Successfully removed from friends list");        
    } catch (err) {
        console.error("Error removing friend:", err);
        res.status(400).send("Error removing from friends list");
    }
};