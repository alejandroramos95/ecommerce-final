import mongoose from "mongoose";

const mensajesSchema = new mongoose.Schema({
  email: { type: String, required: true },
  type: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
});

const MensajesModel = mongoose.model("mensajes", mensajesSchema);

export default MensajesModel;
