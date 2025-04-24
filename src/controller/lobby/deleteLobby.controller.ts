import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const deleteLobby = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedLobby = await Lobby.findByIdAndDelete(id);

        if (!deletedLobby) {
            res.status(404).json({ error: 'Lobby not found' });
        }

        res.status(200).json({ message: 'Lobby deleted successfully', lobby: deletedLobby });
    } catch (error) {
        console.error('Error deleting lobby:', error);
        res.status(500).json({ error: 'Failed to delete lobby' });
    }
};
