import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export function initSocket(server: HttpServer) {

    const activeUsers = new Map();

  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  const chatNamespace = io.of('/chat');

  chatNamespace.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("identify", (userId) => {
        activeUsers.set(socket.id, userId);
        console.log(activeUsers);
        
    });

    socket.on('chat-message', (data) => {
      const enhancedData = {
        ...data,
        userId: socket.id,
        timestamp: new Date().toISOString()
      };

      chatNamespace.emit('chat-message', enhancedData);
      console.log(`Message from ${socket.id}: ${data.text}`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}, ${activeUsers.get(socket.id)}`);
      activeUsers.delete(socket.id);
      console.log(activeUsers);
    });
  });
}
