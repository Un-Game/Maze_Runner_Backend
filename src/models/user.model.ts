import mongoose from "mongoose";
import { controlSchema } from "./control.model";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    exp: {type: Number, default: 0},
    avatar: {type: String},
    control: { type: controlSchema, default: () => ({}) },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

export const User = mongoose.model("user", userSchema);