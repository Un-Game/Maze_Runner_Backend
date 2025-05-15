import mongoose from "mongoose";

export const controlSchema = new mongoose.Schema(
  {
    up: { type: String, default: "KeyW" },
    down: { type: String, default: "KeyS" },
    left: { type: String, default: "KeyA" },
    right: { type: String, default: "KeyD" },
    skill1: { type: String, default: "KeyC" },
    skill2: { type: String, default: "KeyF" },
    skill3: { type: String, default: "KeyT" },
  },
  { _id: false }
);
export const Control = mongoose.model("Control", controlSchema);
