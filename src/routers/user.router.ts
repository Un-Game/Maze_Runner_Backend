import express from 'express'
import { getUser } from '../controller/users/getUser';
import { createUser } from '../controller/users/createUser.controller';

export const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.post("/", createUser);