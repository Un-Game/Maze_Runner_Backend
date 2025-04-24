import mongoose from "mongoose";

const lobbySchema = new mongoose.Schema({
    players: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    ],
    status: {
        type: String,
        enum: ["starting", "in_progress", "ended"],
        default: "starting"
    },
    game_mode: {
        type: String,
        enum: ["ranked", "unranked", "custom"],
        default: "unranked"
    },
    map: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Map",
        required: true
    }
}, { timestamps: true });

export const Lobby = mongoose.model("Lobby", lobbySchema);
