import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, require: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, require: true}
})

requestSchema.index({ senderId: 1, receiverId: 1 });
export const Req = mongoose.model("request", requestSchema);