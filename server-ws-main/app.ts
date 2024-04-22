import cors from "cors";
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { EventsSocket } from "./src/entities/event.types";

const app = express();

app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 4000);

app.get("/", (req, res) => {
  res.status(200).send("Dentro del servidor Socket");
});

app.use("*", (req, res) => {
  res.send("No se encuentra disponible");
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  },
});

io.on(EventsSocket.CONNECTION, (socket) => {
  socket.on(EventsSocket.SEND_DATA, (data: any) => {
    console.log(data);
    io.emit(EventsSocket.RECEIVE_DATA, data);
  });
});

//Empieza servidor
server.listen(app.get("port"), () => {
  console.log("Servidor corriendo en puerto", app.get("port"));
});
