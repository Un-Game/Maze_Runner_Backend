import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from "cors"
import { userRouter } from './routers/user.router';
import dotenv from 'dotenv';
import { lobbyRouter } from './routers/lobby.router';
import { mapRouter } from './routers/map.router';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL as string
const app = express();
const port = 999;

console.log(databaseUrl);
const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl as string)
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected" , error);
  }
}

connectDB();

app.use(express.json())
app.use(cors())

app.use("/user", userRouter);
app.use("/lobby", lobbyRouter);
app.use("/map", mapRouter);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
