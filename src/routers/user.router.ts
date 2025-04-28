import express from 'express'
import { getUser } from '../controller/users/getUser';
import { createUser } from '../controller/users/createUser.controller';
import { updateUser } from '../controller/users/updateUser.controller';
import { deleteUser } from '../controller/users/deleteUser.controller';
import { loginAuthentication } from '../controller/users/login';

export const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginAuthentication );