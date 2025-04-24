import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const updateLobby = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { players, status, game_mode, map } = req.body;

  try {
    const updatedLobby = await Lobby.findByIdAndUpdate(
      id,
      {
        ...(players && { players }),
        ...(status && { status }),
        ...(game_mode && { game_mode }),
        ...(map && { map })
      },
      { new: true, runValidators: true }
    );

    if (!updatedLobby) {
      res.status(404).json({ error: 'Lobby not found' });
    }

    res.status(200).json({
      message: 'Lobby updated successfully',
      lobby: updatedLobby
    });
  } catch (error) {
    console.error('Error updating lobby:', error);
    res.status(500).json({ error: 'Failed to update lobby' });
  }
};
