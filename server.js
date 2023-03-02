import express from "express";
import cookieParser from "cookie-parser";
import { createOnMongoStore } from "./src/services/userService.js";
import passport from "./src/controllers/middlewares/passport.js";

import routerCarrito from "./src/routes/carritos.router.js";
import routerProductos from "./src/routes/productos.router.js";
import routerUser from "./src/routes/user.router.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

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

app.all("*", (req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta '${req.originalUrl}' no implementada`,
  });
});

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
