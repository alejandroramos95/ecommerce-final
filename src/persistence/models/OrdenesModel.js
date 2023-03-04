import mongoose from "mongoose";

const ordenesSchema = new mongoose.Schema(
  {
    productos: [],
    estado: String,
    email: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const OrdenesModel = mongoose.model("ordenes", ordenesSchema);

export default OrdenesModel;
