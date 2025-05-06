import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const publicLobby = async (req: Request, res: Response) => {
    try {
        const lobbyData = await Lobby.find({ isPrivate: false })
            .populate('map', 'name')
            .populate('players', 'username');

        res.status(200).send(lobbyData);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(400).send("Failed to fetch public lobbies");
    }
};
