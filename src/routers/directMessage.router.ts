import express from 'express';
import { getDirectMessages } from '../controller/directMessage/getDirectMessage';

export const messageRouter = express.Router();

messageRouter.get("/:user1/:user2", getDirectMessages);