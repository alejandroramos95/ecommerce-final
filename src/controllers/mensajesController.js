import path from "path";
const __dirname = path.resolve();

import ContenedorMensajesDao from "../persistence/DAOs/Mensajes.dao.js";
const contenedorMensajesDao = new ContenedorMensajesDao();
import moment from "moment";

export function globalChat(req, res) {
  res.sendFile(__dirname + "/public/chat.html");
  const io = req.app.get("socketio");
  io.on("connection", async (socket) => {
    if (req.cookie?.userLoggedEmail === undefined) {
      console.log(`Usuario no autorizado conectado`);
    } else {
      console.log(`Usuario ${req.cookie.userLoggedEmail} conectado`);
    }

    const messages = await contenedorMensajesDao.getAll();

    socket.emit("messages", messages);

    socket.on("new-message", async (data) => {
      data.date = moment().format("DD-MM-YYYY HH:mm:ss");

      await contenedorMensajesDao.save(data);

      io.sockets.emit("messages", await contenedorMensajesDao.getAll());
    });
  });
  res.sendFile(__dirname + "/public/chat.html");
}

export function personalChat(req, res) {
  res.sendFile(__dirname + "/public/chat.html");
}
