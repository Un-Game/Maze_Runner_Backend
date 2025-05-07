import express from 'express'
import { getLobby } from '../controller/lobby/getLobby.controller';
import { createLobby } from '../controller/lobby/createLobby.controller';
import { deleteLobby } from '../controller/lobby/deleteLobby.controller';
import { updateLobby } from '../controller/lobby/updateLobby.controller';
import { publicLobby } from '../controller/lobby/publicLobby.controller';

export const lobbyRouter = express.Router();

lobbyRouter.get("/:code", getLobby);
lobbyRouter.get("", publicLobby);
lobbyRouter.post("/", createLobby);
lobbyRouter.put("/:id", updateLobby );
lobbyRouter.delete('/:id', deleteLobby);
