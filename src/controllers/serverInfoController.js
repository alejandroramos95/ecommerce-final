import os from "os";
import dotenv from "dotenv";

dotenv.config();

const numCpu = os.cpus().length;
const PORT = process.env.SERVER_PORT;

export function serverInfo(req, res) {
  const serverInfo = [
    {
      pid: process.pid,
      version: process.version,
      id: process.id,
      memoria: process.memoryUsage().rss,
      sistemaOperativo: process.platform,
      carpeta: process.cwd(),
      path: process.argv[0],
      cpus: numCpu,
      puerto: PORT,
    },
  ];
  res.render("server-info", { serverInfo });
}
