import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const createLobby = async (req: Request, res: Response) => {
    const { players, map, status, game_mode } = req.body;

    if (!players || !Array.isArray(players) || players.length === 0) {
        res.status(400).json({ error: 'At least one player is required' });
    }

    if (!map) {
        res.status(400).json({ error: 'Map is required' });
    }

    try {
        const newLobby = new Lobby({
            players,
            map,
            status,
            game_mode
        });

        await newLobby.save();

        res.status(201).json({
            message: 'Lobby created successfully',
            lobby: newLobby
        });
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}