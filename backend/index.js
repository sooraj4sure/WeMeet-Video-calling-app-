import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { log } from "node:console";
import { connect } from "node:http2";
import path from "node:path";
import userRoutes from "./src/routes/users.routes.js";
import { connectToSocket } from "./src/controllers/socketManager.js";
import { User } from "./src/models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

app.set("port", (process.env.PORT || 8000));

app.get("/home", (req, res) => {
  return res.json({ hello: "world" });
});

const start = async () => {
  const connectionDb = await mongoose.connect(process.env.MONGO_URI)
  console.log(`MONGO Connection DB Host:${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
      console.log("Listining... on port 8000");
    });
};

start();









