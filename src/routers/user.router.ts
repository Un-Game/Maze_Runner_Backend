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
import { getKeybind } from "../controller/users/getUserKeybind";
import { updateKeybind } from "../controller/users/updateKeybind";
import { updatePassword } from "../controller/users/updatePassword.controller";

export const userRouter = express.Router();

userRouter.get("/find/:username", findUser);
userRouter.get("/", getAllUser);
userRouter.post("/", createUser);
userRouter.put("/addfriend", newFriend);
userRouter.put("/removefriend", removeFriend);
userRouter.get("/:id", getUser);
userRouter.put("/:id", updateUser);
userRouter.put("/:id/password", updatePassword);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginAuthentication);
userRouter.get("/:id/keybinds", getKeybind);
userRouter.put("/:id/keybinds", updateKeybind);
