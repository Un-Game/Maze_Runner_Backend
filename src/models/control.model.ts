import mongoose from "mongoose";

export const controlSchema = new mongoose.Schema(
  {
    up: { type: String, default: "w" },
    down: { type: String, default: "s" },
    left: { type: String, default: "a" },
    right: { type: String, default: "d" },
    skill1: { type: String, default: "c" },
    skill2: { type: String, default: "f" },
    skill3: { type: String, default: "t" },
  },
  { _id: false }
);
export const Control = mongoose.model("Control", controlSchema);
