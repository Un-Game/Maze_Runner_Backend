import mongoose from 'mongoose';

export const controlSchema = new mongoose.Schema({
  up: { type: String, default: 'W' },
  down: { type: String, default: 'S' },
  left: { type: String, default: 'A' },
  right: { type: String, default: 'D' },
}, { _id: false });