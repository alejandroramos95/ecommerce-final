import mongoose from "mongoose";

const productoSchema = new mongoose.Schema(
  {
    Nombre: String,
    Categoria: String,
    Descripcion: String,
    Codigo: Number,
    LinkFoto: String,
    Precio: Number,
    Stock: Number,
    Cantidad: { type: Number, require: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const ProductoModel = mongoose.model("producto", productoSchema);

export default ProductoModel;
