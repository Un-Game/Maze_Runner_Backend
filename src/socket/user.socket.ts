import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import axios from "axios";

let io: Server;
const activeUsers = new Map<string, string>(); // socket.id -> userId
const lobbyList = new Set();

export function initSocket(server: HttpServer) {
  if (io) return; // Prevent re-initialization

  io = new Server(server, {
    cors: {
      origin: ["https://mazerunner-zen1e-monhdelgers-projects.vercel.app", "http://localhost:3000","http://192.168.129.199:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  function getKeyByValue(value:String) {
    for (const [key, val] of activeUsers.entries()) {
      if (val === value) {
        return key;
      }
    }
    return undefined;
  }

  io.on("connection", (socket) => {
    console.log(`[SOCKET] Connected: ${socket.id}`);

    // Identify the user (e.g., on login or token validation)
    socket.on("identify", (userId: string) => {
      activeUsers.set(socket.id, userId);
      console.log(`[SOCKET] ${socket.id} identified as ${userId}`);

      activeUsers.forEach((element,ind) => {
        console.log(`User ${ind}: ${element}`);
        
      });
      
    });

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

    socket.on("chat:dm", (data) => {
      const payload = {
        ...data,
        userId: activeUsers.get(socket.id),
        timestamp: new Date().toISOString(),
      };

      const receiver = getKeyByValue(data.to);

      if(receiver){
        io.to(receiver).emit("chat:dm", payload);
        io.to(socket.id).emit("chat:dm", payload);
        console.log("DM", payload);
      }
    })

    // ==== Lobby System ====

    // socket.on("lobby:create", )

    socket.on("lobby:join", async(data) => {

      const {room} = data;
      
      const joining = activeUsers.get(socket.id)
      if(!joining || !room){
        io.to(socket.id).emit("lobby:error",{message: "Input needed"});
        return;
      }

      const roomInfo = io.sockets.adapter.rooms.get(room);
      if(roomInfo && roomInfo.size === 2){
        io.to(socket.id).emit("lobby:error",{message: `${roomInfo.size}`});
        return;
      }

      io.to(socket.id).emit("lobby:success");
      
      socket.join(room);
      
      try{
        await axios.put(`http://localhost:999/lobby/${room}`,{addPlayers: [joining]})
        io.to(room).emit("lobby:update", {});
      }catch(err){
        console.log("Couldn't send to db");
      }
      
    });

    socket.on("lobby:leave", async(data) => {
      const {room} = data

      const leaving = activeUsers.get(socket.id)
      if(!room || !leaving)
        return;

      socket.leave(room);

      try{
        await axios.put(`http://localhost:999/lobby/${room}`,{removePlayers: [leaving]})
        io.to(room).emit("lobby:update", {});
      }catch(err){
        console.log("Couldn't send to db");
      }
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
