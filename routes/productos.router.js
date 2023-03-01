import { Router } from "express";
import {
  leerProductos,
  listarPorCategoria,
  listarPorId,
  guardoProductoEnDB,
  borrarProducto,
  actualizarProducto,
} from "../controllers/productosController.js";

const router = Router();

router.get("/productos", leerProductos);
router.get("/productos/:categoria", listarPorCategoria);
router.get("/productos/:id", listarPorId);
router.post("/productos", guardoProductoEnDB);
router.put("/productos/:id", actualizarProducto);
router.delete("/productos/:id", borrarProducto);

export default router;
