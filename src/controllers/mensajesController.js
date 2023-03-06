import path from "path";
const __dirname = path.resolve();

export function globalChat(req, res) {
  res.sendFile(__dirname + "/public/index.html");
}

export function personalChat(req, res) {
  res.sendFile(__dirname + "/public/index.html");
}
