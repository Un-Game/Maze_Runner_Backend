import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import { Server } from 'socket.io';
import { userRouter } from './routers/user.router';
import dotenv from 'dotenv';
import { lobbyRouter } from './routers/lobby.router';
import { mapRouter } from './routers/map.router';
import { createServer } from 'http';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL as string;
const app = express();
const port = 999;
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

console.log(databaseUrl);
const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected", error);
  }
};

connectDB();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "*"
}));

app.use("/user", userRouter);
app.use("/lobby", lobbyRouter);
app.use("/map", mapRouter);

// io.of('/game')

io.of('/chat').on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('chat-message', (data) => {
    // uds => chatGroupId

    const enhancedData = {
      ...data,
      userId: socket.id,
      timestamp: new Date().toISOString()
    };

    io.emit('chat-message', enhancedData);
    console.log(`Message from ${socket.id}: ${data.text}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});