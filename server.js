import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createOnMongoStore } from "./src/services/userService.js";
import cookieParser from "cookie-parser";
import passport from "./src/middlewares/Passport.js";

import routerCarrito from "./src/routes/carritos.router.js";
import routerProductos from "./src/routes/productos.router.js";
import routerUser from "./src/routes/user.router.js";
import routerServerInfo from "./src/routes/serverInfo.router.js";
import routerMensajes from "./src/routes/mensajes.router.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.set("socketio", io);

app.set("view engine", "ejs");
app.set("views", __dirname + "/public/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(createOnMongoStore());

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routerProductos);
app.use("/", routerCarrito);
app.use("/", routerUser);
app.use("/", routerServerInfo);
app.use("/", routerMensajes);

app.all("*", (req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta '${req.originalUrl}' no implementada`,
  });
});

const PORT = process.env.SERVER_PORT;

import ContenedorMensajesDao from "./src/persistence/DAOs/Mensajes.dao.js";
const contenedorMensajesDao = new ContenedorMensajesDao();
import moment from "moment";

io.on("connection", async (socket) => {
  console.log(`Usuario ${socket.id} conectado`); // Identifico usuario logueado

  socket.emit("messages", await contenedorMensajesDao.getAll()); // Emito los mensajes previamente cargados

  socket.on("new-message", async (data) => {
    data.type = "Usuario";
    data.date = moment().format("DD-MM-YYYY HH:mm:ss");

    await contenedorMensajesDao.save(data); // Guardo el nuevo mensaje generado con la fecha que se envio

    io.sockets.emit("messages", await contenedorMensajesDao.getAll()); // Emito los mensajes globales
  });

  socket.on("disconnect", () => {
    console.log(`Usuario ${socket.id} desconectado`); // Identifico usuario deslogueado
  });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error in server ${error}`));
