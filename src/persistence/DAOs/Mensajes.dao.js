// Data Access Object - Mensajes
import mongoose from "mongoose";
import MensajesModel from "../models/MensajesModel.js";

import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGODB;

export default class ContenedorMensajesDao {
  constructor() {
    this.url = mongoURL;
    this.mongodb = mongoose.connect;
  }

  async conectarDB() {
    this.mongodb(this.url);
  }

  async getAll() {
    await this.conectarDB();
    const mensajeDB = await MensajesModel.find({}, { _id: false, __v: false });
    return mensajeDB;
  }

  async save(mensaje) {
    await this.conectarDB();
    const nuevoMensaje = new MensajesModel(mensaje);
    return await nuevoMensaje.save();
  }
}
