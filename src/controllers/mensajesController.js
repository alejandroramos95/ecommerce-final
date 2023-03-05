import ContenedorMensajesDao from "../persistence/DAOs/Mensajes.dao.js";
import moment from "moment";
import { io } from "socket.io";

const contenedorMensajesDao = new ContenedorMensajesDao();

io.on("connection", async (socket) => {
  const messages = await contenedorMensajesDao.getAll();

  socket.emit("messages", messages);

  socket.on("new-message", async (data) => {
    data.date = moment().format("DD-MM-YYYY HH:mm:ss");

    await contenedorMensajesDao.save(data);
    io.sockets.emit("messages", await contenedorMensajesDao.getAll());
  });
});
