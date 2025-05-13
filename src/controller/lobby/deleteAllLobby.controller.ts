import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const deleteAllLobby = async (_req: Request, res: Response) => {
    try {
        const result = await Lobby.deleteMany({});
        res.status(200).json({
            message: 'All lobbies deleted successfully',
            deletedCount: result.deletedCount,
        })
    } catch (error) {
        console.error('Error deleting all lobbies:', error);
        res.status(500).json({ error: 'Failed to delete all lobbies' });
    }
};
