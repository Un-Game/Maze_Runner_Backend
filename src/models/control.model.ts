import mongoose from 'mongoose';

export const controlSchema = new mongoose.Schema({
  up: { type: String, default: 'W' },
  down: { type: String, default: 'S' },
  left: { type: String, default: 'A' },
  right: { type: String, default: 'D' },
  skill1: {type: String, default: "C"},
  skill2: {type: String, default: "F"},
  skill3: {type: String, default: "T"}
}, { _id: false });