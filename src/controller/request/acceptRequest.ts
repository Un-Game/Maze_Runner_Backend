import { Request, Response } from 'express';
import { Req } from '../../models/request.model';
import axios from "axios"

export const acceptRequest = async(req: Request, res: Response) => {
    const { senderId, receiverId } = req.body;

    try {
        await Req.findOneAndDelete({senderId:senderId, receiverId:receiverId});
        try {

            const response = await axios.put("https://maze-runner-backend-2.onrender.com/user/addfriend",{
                senderId: senderId,
                receiverId: receiverId
            });
            console.log(response);
            res.send("Successfully accepted").status(200);
        } catch(err){
            console.log(err);
            res.send("Couldn't add to friend list").status(401)
        }
    } catch (error) {
        res.send("Couldn't find the request").status(400)
        console.log("Error occured ", error);
    }
}