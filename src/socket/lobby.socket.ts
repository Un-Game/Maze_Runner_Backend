import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // --- Lobby namespace ---
  const lobbyNamespace = io.of('/lobby');
  const lobbies = new Map<string, string[]>(); // lobbyId -> list of socket IDs

  lobbyNamespace.on('connection', (socket) => {
    console.log(`Lobby: User connected: ${socket.id}`);

    socket.on('join-lobby', (lobbyId: string) => {
      if (!lobbies.has(lobbyId)) {
        lobbies.set(lobbyId, []);
      }

      const players = lobbies.get(lobbyId)!;
      players.push(socket.id);
      socket.join(lobbyId);

      lobbyNamespace.to(lobbyId).emit('lobby-updated', {
        lobbyId,
        players,
      });

      console.log(`Lobby ${lobbyId} updated:`, players);
    });

    socket.on('leave-lobby', (lobbyId: string) => {
      const players = lobbies.get(lobbyId);
      if (players) {
        const index = players.indexOf(socket.id);
        if (index !== -1) {
          players.splice(index, 1);
          socket.leave(lobbyId);

          lobbyNamespace.to(lobbyId).emit('lobby-updated', {
            lobbyId,
            players,
          });

          console.log(`Lobby ${lobbyId} updated:`, players);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log(`Lobby: User disconnected: ${socket.id}`);
      // Remove from all lobbies
      for (const [lobbyId, players] of lobbies.entries()) {
        const index = players.indexOf(socket.id);
        if (index !== -1) {
          players.splice(index, 1);
          lobbyNamespace.to(lobbyId).emit('lobby-updated', {
            lobbyId,
            players,
          });
        }
      }
    });
  });
}
