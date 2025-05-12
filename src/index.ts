import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import { createServer } from 'http';
import dotenv from 'dotenv';
import { userRouter } from './routers/user.router';
import { lobbyRouter } from './routers/lobby.router';
import { mapRouter } from './routers/map.router';
import { requestRouter } from './routers/request.router';
import { initSocket } from './socket/user.socket';
import { messageRouter } from './routers/directMessage.router';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL as string;
const app = express();
const port = 999;

const server = createServer(app);

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
  origin: "*",
  methods: "*"
}));

app.use("/user", userRouter);
app.use("/lobby", lobbyRouter);
app.use("/map", mapRouter);
app.use("/request", requestRouter);
app.use("/message", messageRouter);

initSocket(server);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
