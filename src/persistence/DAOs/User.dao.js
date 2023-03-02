// Data Access Object - Usuarios
import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

const mongoURL = process.env.MONGODB;

export default class ContenedorUsuarioDao {
  constructor() {
    this.url = mongoURL;
    this.mongodb = mongoose.connect;
  }

  async conectarDB() {
    await this.mongodb(this.url);
  }

  async buscarUsuarioPorEmail(email) {
    await this.conectarDB();
    const usuario = await UserModel.findOne({ email });
    return usuario;
  }

  async registrarUsuario(usuario) {
    await this.conectarDB();
    const userExist = await UserModel.findOne({ email: usuario.email });
    if (userExist) return false;
    usuario.password = createHash(usuario.password);
    const newUser = new UserModel(usuario);
    await newUser.save();
    return true;
  }

  async actualizarUsuario(email, idCar) {
    await this.conectarDB();
    const user = await this.buscarUsuarioPorEmail(email);
    //console.log("desdedb", user, idCar);
    await UserModel.findByIdAndUpdate(user._id, {
      $set: { carrito: idCar },
    });
    return true;
  }
}
