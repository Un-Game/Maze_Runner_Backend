import express from "express";
import { getUser } from "../controller/users/getUser";
import { createUser } from "../controller/users/createUser.controller";
import { updateUser } from "../controller/users/updateUser.controller";
import { deleteUser } from "../controller/users/deleteUser.controller";
import { loginAuthentication } from "../controller/users/login";
import { newFriend } from "../controller/users/newFriend";
import { removeFriend } from "../controller/users/removeFriend";
import { findUser } from "../controller/users/findUser";
import { getAllUser } from "../controller/users/getAllUser";

export const userRouter = express.Router();

userRouter.get("/find/:username", findUser);
userRouter.get("/", getAllUser);
userRouter.post("/", createUser);
userRouter.put("/addfriend", newFriend);
userRouter.put("/removefriend", removeFriend);
userRouter.put("/:id", updateUser);
userRouter.get("/:id", getUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginAuthentication);
