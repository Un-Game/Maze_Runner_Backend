import express from 'express'
import { addFriend } from '../controller/request/addFriend';

export const requestRouter = express.Router();

requestRouter.post("/",addFriend);
// requestRouter.delete("/accept",);
// requestRouter.delete("/reject",);