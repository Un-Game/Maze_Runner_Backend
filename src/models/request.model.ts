import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    senderId: {type: Number, require: true},
    receiverId: {type: Number, require: true}
})

requestSchema.index({ senderId: 1, receiverId: 1 });
export const Req = mongoose.model("request", requestSchema);