import { Router } from "express";
import {
  crearCarrito,
  leerCarritos,
  obtenerCarritoPorId,
  guardarProductoEnCarrito,
  eliminarProductoDeCarrito,
  eliminarCarritoPorId,
} from "../controllers/carritosController.js";

const router = Router();

router.post("/crear-carrito", crearCarrito);
router.get("/carrito:id", obtenerCarritoPorId);
router.post("/carrito:id/producto:idProd", guardarProductoEnCarrito);
router.delete("/carrito:id/producto:idProd", eliminarProductoDeCarrito);
router.delete("/carrito:id", eliminarCarritoPorId);
router.get("/carrito/listar", leerCarritos);

export default router;
