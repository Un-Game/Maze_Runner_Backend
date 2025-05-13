import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true }
}, { _id: false });

const mapSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  layout: { type: Object, required: true},
}, { timestamps: true });

export const Map = mongoose.model("Map", mapSchema);
