// Data Access Object - Productos
import mongoose from "mongoose";
import ProductoModel from "../models/ProductoModel.js";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGODB;

export default class ContenedorProductosDao {
  constructor() {
    this.url = mongoURL;
    this.mongodb = mongoose.connect;
  }

  async conectarDB() {
    await this.mongodb(this.url);
  }

  async leerProductos() {
    try {
      await this.conectarDB();
      return await ProductoModel.find();
    } catch (e) {
      console.log("Error en leerProductos: ", e);
    }
  }

  async listarPorCategoria(categ) {
    try {
      await this.conectarDB();
      return await ProductoModel.find({ Categoria: { $eq: categ } });
    } catch (e) {
      console.log("Error en listarPorCategoria: ", e);
    }
  }

  async guardoProductoEnDB(producto) {
    try {
      await this.conectarDB();
      const nuevoProducto = new ProductoModel(producto);
      console.log("ID del producto guardado: ", nuevoProducto.id);
      return await nuevoProducto.save();
    } catch (e) {
      console.log("Error en guardoProductoEnDB: ", e);
    }
  }

  async listarPorId(id) {
    try {
      await this.conectarDB();
      return await ProductoModel.findById(id);
    } catch (e) {
      console.log("Error en listar: ", e);
    }
  }

  async actualizarProducto(prod, id) {
    try {
      await this.conectarDB();
      await ProductoModel.findByIdAndUpdate(id, prod);
    } catch (e) {
      console.log("Error en actualizar: ", e);
    }
  }

  async borrarProducto(id) {
    try {
      await this.conectarDB();
      await ProductoModel.findByIdAndDelete(id);
    } catch (e) {
      console.log("Error en borrar: ", e);
    }
  }
}
