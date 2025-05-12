import mongoose from "mongoose";

const directMessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  sender: { type: String, required: true },
  userId: { type: String, required: true },
  to: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const DirectMessage = mongoose.model("directMessage", directMessageSchema);

