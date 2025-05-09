import mongoose, { Document, Schema, Model } from "mongoose";

export interface ILobby extends Document {
    name: string;
    players: mongoose.Types.ObjectId[];
    status: "starting" | "in_progress" | "ended";
    game_mode: "ranked" | "unranked" | "custom";
    map: mongoose.Types.ObjectId;
    joinCode: string;
    isPrivate: boolean
    createdAt: Date;
    updatedAt: Date;
}

const LobbySchema = new Schema<ILobby>({
    name: {type: String, required: true},
    players: [{ type: Schema.Types.ObjectId, ref: "user" }],
    status: {
        type: String,
        enum: ["starting", "in_progress", "ended"],
        default: "starting"
    },
    game_mode: {
        type: String,
        enum: ["ranked", "unranked", "custom"],
        default: "custom"
    },
    map: { type: Schema.Types.ObjectId, ref: "Map", required: true },
    joinCode: {
        type: String,
        required: true,
        unique: true,
        length: 6
    },
    isPrivate: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

export const Lobby: Model<ILobby> = mongoose.models.Lobby || mongoose.model<ILobby>("Lobby", LobbySchema);
