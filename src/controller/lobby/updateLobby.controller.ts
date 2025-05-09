import { Request, Response } from 'express';
import { Lobby } from '../../models/lobby.model';

export const updateLobby = async (req: Request, res: Response) => {
  const { code } = req.params;
  const joinCode = Number(code);
  
  const { addPlayers, removePlayers, status, game_mode, map, name } = req.body;

  const updateQuery: any = {};

  if (addPlayers && Array.isArray(addPlayers)) {
    updateQuery.$addToSet = { players: { $each: addPlayers } };
  }

  if (removePlayers && Array.isArray(removePlayers)) {
    updateQuery.$pull = { players: { $in: removePlayers } };
  }

  if (status || game_mode || map || name) {
    updateQuery.$set = {
      ...(status && { status }),
      ...(game_mode && { game_mode }),
      ...(map && { map }),
      ...(name && { name }),
    };
  }

  try {
    const updatedLobby = await Lobby.findOneAndUpdate(
      { joinCode },
      updateQuery,
      { new: true}
    );

    if (!updatedLobby) {
      res.status(404).json({ error: 'Lobby not found' });
      return;
    }

    if (updatedLobby.players.length === 0) {
      await Lobby.deleteOne({ joinCode });
      res.status(200).json({ message: 'Lobby was empty and has been deleted' });
      return;
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
