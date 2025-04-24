import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
}, { _id: false });

const mapSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  layout: {
    type: [[Number]], // 2D array of 0s and 1s
    required: true,
    validate: {
      validator: (val: number[][]) =>
        Array.isArray(val) && val.every(row => Array.isArray(row) && row.every(cell => cell === 0 || cell === 1)),
      message: "Layout must be a 2D array of 0s and 1s"
    }
  },
  start_points: {
    player1: { type: pointSchema, required: true },
    player2: { type: pointSchema, required: true }
  }
}, { timestamps: true });

export const Map = mongoose.model("Map", mapSchema);
