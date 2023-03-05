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

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

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

app.all("*", (req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta '${req.originalUrl}' no implementada`,
  });
});

const PORT = process.env.SERVER_PORT;

io.on("connection", (socket) => {
  console.log("se conecto un usuario");
});

app.set("socketio", io);

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error in server ${error}`));
