import path from "path";
const __dirname = path.resolve();

import ContenedorMensajesDao from "../persistence/DAOs/Mensajes.dao.js";
const contenedorMensajesDao = new ContenedorMensajesDao();

export function globalChat(req, res) {
  res.sendFile(__dirname + "/public/chat.html");
  const io = req.app.get("socketio");
  io.on("connection", async (socket) => {
    const messages = await contenedorMensajesDao.getAll();
    socket.emit("messages", messages);
  });
}

export function personalChat(req, res) {
  res.sendFile(__dirname + "/public/chat-email.html");
  const io = req.app.get("socketio");
  io.on("connection", async (socket) => {
    const myMessages = await contenedorMensajesDao.getByEmail(req.params.email);
    socket.emit("messages", myMessages);
  });
}
