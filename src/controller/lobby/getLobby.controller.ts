
import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const getLobby = async (req: Request, res: Response) => {
    try {
        const lobbyData = await Lobby.find({});
        res.send(lobbyData).status(200)
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}