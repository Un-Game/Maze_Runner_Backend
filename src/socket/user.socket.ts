import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import axios from "axios";
import { DirectMessage } from "../models/directMessage.model";

let io: Server;
const activeUsers = new Map<string, string>(); // socket.id -> userId
const lobbyList = new Set();

export function initSocket(server: HttpServer) {
  if (io) return;

  io = new Server(server, {
    cors: {
      origin: ["https://mazerunner-zen1e-monhdelgers-projects.vercel.app", "https://mazerunnerd.vercel.app", "http://localhost:3000", "http://192.168.129.199:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  function getKeyByValue(value: String) {
    for (const [key, val] of activeUsers.entries()) {
      if (val === value) {
        return key;
      }
    }
    return undefined;
  }

  io.on("connection", (socket) => {
    console.log(`[SOCKET] Connected: ${socket.id}`);

    socket.on("identify", (userId: string) => {
      activeUsers.set(socket.id, userId);
      console.log(`[SOCKET] ${socket.id} identified as ${userId}`);
    });

    // ==== Friend ====

    socket.on("friend:request",(data)=>{
      const {sender} = data;
      const s = getKeyByValue(sender);
      if(!s) return;
      io.to(s).emit("friend:request");
    })

    // ==== Chat System ====
    socket.on("chat:message", (data) => {
      const payload = {
        ...data,
        userId: activeUsers.get(socket.id),
        timestamp: new Date().toISOString(),
      };

      io.emit("chat:message", payload);
      console.log(`[CHAT]`, payload);
    });

    socket.on("chat:dm", async (data) => {
      const payload = {
        ...data,
        userId: activeUsers.get(socket.id),
        timestamp: new Date().toISOString(),
      };

      const receiver = getKeyByValue(data.to);

      try {
        await DirectMessage.create({
          text: payload.text,
          sender: payload.sender,
          userId: payload.userId,
          to: data.to,
          timestamp: payload.timestamp
        });

        if (receiver) {
          io.to(receiver).emit("chat:dm", payload);
        }
        io.to(socket.id).emit("chat:dm", payload);

        console.log("DM saved and sent", payload);
      } catch (error) {
        console.error("Failed to save DM", error);
      }
    })

    // ==== Lobby System ====

    socket.on("lobby:join", async (data) => {

      const { room } = data;

      const joining = activeUsers.get(socket.id)
      if (!joining || !room) {
        io.to(socket.id).emit("lobby:error", { message: "Input needed" });
        return;
      }

      const roomInfo = io.sockets.adapter.rooms.get(room);
      if (roomInfo && roomInfo.size === 2) {
        io.to(socket.id).emit("lobby:error", { message: `${roomInfo.size}` });
        return;
      }

      io.to(socket.id).emit("lobby:success");

      socket.join(room);

      try {
        await axios.put(`http://localhost:999/lobby/${room}`, { addPlayers: [joining] })
        io.to(room).emit("lobby:update", {});
      } catch (err) {
        console.log("Couldn't send to db");
      }

    });

    socket.on("lobby:leave", async (data) => {
      const { room } = data

      const leaving = activeUsers.get(socket.id)
      if (!room || !leaving)
        return;

      socket.leave(room);

      try {
        await axios.put(`http://localhost:999/lobby/${room}`, { removePlayers: [leaving] })
        io.to(room).emit("lobby:update", {});
      } catch (err) {
        console.log("Couldn't send to db");
      }
    });

    socket.on("lobby:start", async (data) => {
      const { room } = data

      if (!room)
        return;

      try {
        await axios.put(`http://localhost:999/lobby/${room}`, { status: "in_progress" })
        io.to(room).emit("lobby:start");
      } catch (err) {
        console.log("Couldn't start the game");
      }
    })

    // ==== Game ====
    socket.on("game:move", (data) => {
      const { x, y, room } = data;
      socket.to(room).emit("game:move", { x, y });
    })

    socket.on("game:ping", (data) => {
      const {timeStamp} = data;
      socket.emit("game:ping",{timeStamp:timeStamp});
    })

    socket.on("game:finish", (data)=>{
      const {room} = data;
      const winner = activeUsers.get(socket.id);
      io.to(room).emit("game:finished",{winner: winner});
    })

    // ==== Disconnect ====
    socket.on("disconnect", () => {
      console.log(`[SOCKET] Disconnected: ${socket.id}`);
      activeUsers.delete(socket.id);
    });
  });
}
