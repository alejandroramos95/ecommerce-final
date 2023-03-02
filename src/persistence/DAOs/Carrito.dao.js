// Data Access Object - Carritos
import mongoose from "mongoose";
import ContenedorProductosDao from "./Producto.dao.js";
import CarritoModel from "../models/CarritoModel.js";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGODB;

export default class ContenedorCarritosDao {
  constructor() {
    this.url = mongoURL;
    this.mongodb = mongoose.connect;
    this.producto = new ContenedorProductosDao();
  }

  async conectarDB() {
    await this.mongodb(this.url);
  }

  async leerCarritos() {
    try {
      await this.conectarDB();
      return await CarritoModel.find();
    } catch (e) {}
  }

  async obtenerCarritoPorId(id) {
    try {
      await this.conectarDB();
      return await CarritoModel.findById(id);
    } catch (e) {}
  }

  async crearCarrito() {
    try {
      await this.conectarDB();
      const nuevoCarrito = new CarritoModel();
      console.log("ID del carrito creado: ", nuevoCarrito.id);
      await nuevoCarrito.save();
      return nuevoCarrito.id;
    } catch (e) {}
  }

  async guardarProductoEnCarrito(idCarrito, idProd) {
    try {
      await this.conectarDB();
      const prod = await this.producto.listarPorId(idProd);
      await CarritoModel.findByIdAndUpdate(idCarrito, {
        $push: { productos: prod },
      });
    } catch (e) {
      console.log(e);
    }
  }

  async eliminarCarritoPorId(id) {
    await this.conectarDB();
    await CarritoModel.findByIdAndDelete(id);
    try {
    } catch (e) {}
  }

  async eliminarProductoDeCarrito(idCarrito, idProd) {
    try {
      await this.conectarDB();
      const prod = await this.producto.listarPorId(idProd);
      if (prod) {
        await CarritoModel.findByIdAndUpdate(idCarrito, {
          $pull: { productos: prod },
        });
      }
      return prod;
    } catch (e) {
      console.log(e);
    }
  }
}
