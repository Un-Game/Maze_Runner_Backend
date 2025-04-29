import express from 'express'
import { addFriend } from '../controller/request/addFriend';
import { getRequest } from '../controller/request/getRequest';
import { getIncoming } from '../controller/request/getIncoming';
import { acceptRequest } from '../controller/request/acceptRequest';

export const requestRouter = express.Router();

requestRouter.get("/", getRequest);
requestRouter.post("/",addFriend);
requestRouter.delete("/accept",acceptRequest);
// requestRouter.delete("/decline",);
requestRouter.get("/incoming/:id",getIncoming);