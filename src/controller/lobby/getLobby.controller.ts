
import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const getLobby = async (req: Request, res: Response) => {
    const {code} = req.params;
    try {
        const lobbyData = await Lobby.findOne({joinCode: code})
        .populate("players","username avatar");

        if(!lobbyData){
            res.send("Not found").status(404);
            return;
        }

        res.send(lobbyData).status(200)
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}