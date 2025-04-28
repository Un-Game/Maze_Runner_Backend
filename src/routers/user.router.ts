import express from 'express'
import { getUser } from '../controller/users/getUser';
import { createUser } from '../controller/users/createUser.controller';
import { updateUser } from '../controller/users/updateUser.controller';
import { deleteUser } from '../controller/users/deleteUser.controller';
import { loginAuthentication } from '../controller/users/login';
import { newFriend } from '../controller/users/newFriend';
import { removeFriend } from '../controller/users/removeFriend';

export const userRouter = express.Router();

userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginAuthentication );
userRouter.put("/addfriend", newFriend);
userRouter.put("/removefriend", removeFriend);