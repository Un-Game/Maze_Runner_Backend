import express from 'express'
import { addFriend } from '../controller/request/addFriend';
import { getRequest } from '../controller/request/getRequest';
import { getIncoming } from '../controller/request/getIncoming';
import { acceptRequest } from '../controller/request/acceptRequest';
import { declineRequest } from '../controller/request/declineRequest';

export const requestRouter = express.Router();

requestRouter.get("/", getRequest);
requestRouter.post("/",addFriend);
requestRouter.delete("/accept",acceptRequest);
requestRouter.delete("/decline",declineRequest);
requestRouter.get("/incoming/:id",getIncoming);