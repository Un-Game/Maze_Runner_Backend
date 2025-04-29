import { Request, Response } from "express";
import mongoose from "mongoose";
import { Req } from "../../models/request.model";

export const getIncoming = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const incoming = await Req.aggregate([
            {
                $match: {
                    receiverId: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "users", // collection name (lowercase, plural)
                    localField: "senderId",
                    foreignField: "_id",
                    as: "senderInfo"
                }
            },
            { $unwind: "$senderInfo" }, // flatten array from lookup
            {
                $project: {
                    _id: 1,
                    senderId: 1,
                    receiverId: 1,
                    createdAt: 1,
                    senderUsername: "$senderInfo.username",
                    senderAvatar: "$senderInfo.avatar"
                }
            }
        ]);

        res.status(200).send(incoming);
    } catch (err) {
        console.error(err);
        res.status(400).send("Error fetching incoming requests");
    }
};
