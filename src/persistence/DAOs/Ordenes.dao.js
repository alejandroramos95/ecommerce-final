import mongoose from "mongoose";
import OrdenesModel from "../models/OrdenesModel.js";
import dotenv from "dotenv";

dotenv.config();

const mongoURL = process.env.MONGODB;

export default class ContenedorOrdenesDao {
  constructor() {
    this.url = mongoURL;
    this.mongodb = mongoose.connect;
  }

  async conectarDB() {
    this.mongodb(this.url);
  }

  async generarOrden(orden) {
    try {
      await this.conectarDB();
      const nuevaOrden = new OrdenesModel(orden);
      await nuevaOrden.save();
      return nuevaOrden;
    } catch (e) {
      console.log("error en generar orden: ", e);
    }
  }
}
