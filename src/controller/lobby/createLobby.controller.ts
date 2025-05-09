import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';
import { generateUniqueJoinCode } from '../../utils/generateJoinCode';

export const createLobby = async (req: Request, res: Response) => {
    const { players, map, status, game_mode, isPrivate, name } = req.body;

    if (!players || !Array.isArray(players) || players.length === 0) {
        res.status(400).json({ error: 'At least one player is required' });
    }

    if (!map) {
        res.status(400).json({ error: 'Map is required' });
    }

    try {
        const joinCode = await generateUniqueJoinCode();
        const newLobby = new Lobby({
            name,
            players,
            map,
            status,
            game_mode,
            joinCode,
            isPrivate
        });

        await newLobby.save();

        const populatedLobby = await Lobby.findById(newLobby._id)
        .populate('players', 'username avatar');

        res.status(201).json({
            message: 'Lobby created successfully',
            lobby: populatedLobby
        });
    } catch (error) {
        res.send().status(400)
        console.log("Error occured ", error);
    }
}