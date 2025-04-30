import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;
const activeUsers = new Map<string, string>(); // socket.id -> userId

export function initSocket(server: HttpServer) {
  if (io) return; // Prevent re-initialization

  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`[SOCKET] Connected: ${socket.id}`);

    // Identify the user (e.g., on login or token validation)
    socket.on("identify", (userId: string) => {
      activeUsers.set(socket.id, userId);
      console.log(`[SOCKET] ${socket.id} identified as ${userId}`);
    });

    // ==== Chat System ====
    socket.on("chat:message", (data) => {
      const payload = {
        ...data,
        userId: activeUsers.get(socket.id),
        timestamp: new Date().toISOString(),
      };

      io.emit("chat:message", payload); // Broadcast to everyone
      console.log(`[CHAT]`, payload);
    });

    // ==== Lobby System ====
    socket.on("lobby:join", (lobbyId: string) => {
      socket.join(lobbyId);
      console.log(`[LOBBY] ${socket.id} joined ${lobbyId}`);

      io.to(lobbyId).emit("lobby:update", {
        userId: activeUsers.get(socket.id),
        type: "joined",
      });
    });

    socket.on("lobby:leave", (lobbyId: string) => {
      socket.leave(lobbyId);
      console.log(`[LOBBY] ${socket.id} left ${lobbyId}`);

      io.to(lobbyId).emit("lobby:update", {
        userId: activeUsers.get(socket.id),
        type: "left",
      });
    });

    // ==== Notifications ====
    socket.on("notification:send", (data) => {
      const { toUserId, message } = data;

      // You could store userId -> socket.id mappings if needed
      for (const [sockId, uid] of activeUsers.entries()) {
        if (uid === toUserId) {
          io.to(sockId).emit("notification", {
            from: activeUsers.get(socket.id),
            message,
          });
        }
      }
    });

    // ==== Disconnect ====
    socket.on("disconnect", () => {
      console.log(`[SOCKET] Disconnected: ${socket.id}`);
      activeUsers.delete(socket.id);
    });
  });
}
